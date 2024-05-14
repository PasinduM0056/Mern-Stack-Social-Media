import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UDSideBar from '../../components/udComponents/UDSideBar';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useShowToast from '../../hooks/useShowToast';
import productsAtom from '../../atoms/productAtom';
import addAtom from '../../atoms/addAtoms';
import postsAtom from '../../atoms/postsAtom';
import useGetUserProfile from '../../hooks/useGetUserProfile';

const UDHomePage = () => {
  const { user, setLoading } = useGetUserProfile();
  const { username } = useParams();
  const [fetchingAdds, setFetchingAdds] = useState(true);
  const [fetchingProducts, setFetchingProducts] = useState(true);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const [products, setProducts] = useRecoilState(productsAtom);
  const [adds, setAdds] = useRecoilState(addAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const showToast = useShowToast();
  const [postCreationData, setPostCreationData] = useState([]);
  const [productCreationData, setProductCreationData] = useState([]);
  const [advertisementCreationData, setAdvertisementCreationData] = useState([]);

  useEffect(() => {
    const fetchData = async (apiUrl, setterFunction, updateFunction) => {
      if (!user) return;
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        console.log(data);
        setterFunction(data);
        updateFunction(data);
      } catch (error) {
        showToast('Error', error.message, 'error');
        setterFunction([]);
        updateFunction([]);
      }
    };

    fetchData(`/api/posts/user/${username}`, setPosts, updatePostCreationData);
    fetchData(`/api/products/user/${username}`, setProducts, updateProductCreationData);
    fetchData(`/api/adds/user/${username}`, setAdds, updateAdvertisementCreationData);
  }, [username, showToast, setPosts, setProducts, setAdds, user]);

  const updatePostCreationData = (posts) => {
    const creationData = posts.reduce((acc, post) => {
      const creationDate = new Date(post.createdAt).toLocaleDateString();
      acc[creationDate] = acc[creationDate] ? acc[creationDate] + 1 : 1;
      return acc;
    }, {});
    setPostCreationData(Object.entries(creationData).map(([date, count]) => ({ date, count })));
  };

  const updateProductCreationData = (products) => {
    const creationData = products.reduce((acc, product) => {
      const creationDate = new Date(product.createdAt).toLocaleDateString();
      acc[creationDate] = acc[creationDate] ? acc[creationDate] + 1 : 1;
      return acc;
    }, {});
    setProductCreationData(Object.entries(creationData).map(([date, count]) => ({ date, count })));
  };

  const updateAdvertisementCreationData = (adds) => {
    const creationData = adds.reduce((acc, advertisement) => {
      const creationDate = new Date(advertisement.createdAt).toLocaleDateString();
      acc[creationDate] = acc[creationDate] ? acc[creationDate] + 1 : 1;
      return acc;
    }, {});
    setAdvertisementCreationData(Object.entries(creationData).map(([date, count]) => ({ date, count })));
  };

  return (
    <main className='main-container'>
      <UDSideBar />
      <div className='main-title'>
      </div>

      <div className='main-cards'>
        <div className='card' style={{ paddingLeft: '20px', marginTop: '20px', marginLeft: '50px' }}>
          <div className='card-inner bg-indigo-300'>
            <h3 style={{ color: '#000000' }}>POSTS</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{posts.length}</h1>
        </div>
        <div className='card' style={{ paddingLeft: '20px', marginTop: '20px', color: '#000000' , marginLeft: '25px'}}>
          <div className='card-inner bg-indigo-300'>
            <h3 style={{ color: '#000000' }}>PRODUCTS</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{products.length}</h1>
        </div>
        <div className='card' style={{ paddingLeft: '20px', marginTop: '20px', marginLeft: '25px' }}>
          <div className='card-inner bg-indigo-300'>
            <h3 style={{ color: '#000000' }}>ADVERTISEMENTS</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{adds.length}</h1>
        </div>
      </div>

      <div className='line-chart-container'>
        <h3 style={{ color: '#000000' }}>Posts Created Over Time</h3>
        <ResponsiveContainer width='90%' height={300}>
          <LineChart data={postCreationData} margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='count' stroke='#8884d8' activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='line-chart-container'>
        <h3 style={{ color: '#000000' }}>Products Created Over Time</h3>
        <ResponsiveContainer width='90%' height={300}>
          <LineChart data={productCreationData} margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='count' stroke='#82ca9d' activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='line-chart-container'>
        <h3 style={{ color: '#000000' }}>Advertisements Created Over Time</h3>
        <ResponsiveContainer width='90%' height={300}>
          <LineChart data={advertisementCreationData} margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='count' stroke='#ffc658' activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
};

export default UDHomePage;
