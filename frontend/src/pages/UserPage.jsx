import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner, Button } from "@chakra-ui/react"; // Assuming Button is imported from Chakra UI
import Post from "../components/Post";
import Product from "../components/Product"; // Assuming Product component is defined
import Add from "../components/Add"; // Assuming Advertisement component is defined
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import productsAtom from "../atoms/productAtom";
import packagesAtom from "../atoms/packagesAtom";
import addAtom from "../atoms/addAtoms";
import Package from "../components/Package";

const UserPage = () => {
    const { user, loading } = useGetUserProfile();
    const { username } = useParams();
    const showToast = useShowToast();
    const [posts, setPosts] = useRecoilState(postsAtom);
    const [products, setProducts] = useRecoilState(productsAtom);
    const [packages, setPackages] = useRecoilState(packagesAtom);
    const [adds, setAdds] = useRecoilState(addAtom);
    const [fetchingPosts, setFetchingPosts] = useState(true);
    const [fetchingProducts, setFetchingProducts] = useState(true);
    const [fetchingPackages, setFetchingPackages] = useState(true);
    const [fetchingAdds, setFetchingAdds] = useState(true);
    const [displayPosts, setDisplayPosts] = useState(true); // State to track whether to display posts
    const [displayProducts, setDisplayProducts] = useState(true);
    const [displayPackages, setDisplayPackages] = useState(true); // State to track whether to display products
    const [displayAdds, setDisplayAdds] = useState(false); // State to track whether to display advertisements

    useEffect(() => {
        const getPosts = async () => {
            if (!user) return;
            setFetchingPosts(true);
            try {
                const res = await fetch(`/api/posts/user/${username}`);
                const data = await res.json();
                console.log(data);
                setPosts(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setPosts([]);
            } finally {
                setFetchingPosts(false);
            }
        };

        getPosts();
    }, [username, showToast, setPosts, user]);

    useEffect(() => {
        const getProducts = async () => {
            if (!user) return;
            setFetchingProducts(true);
            try {
                const res = await fetch(`/api/products/user/${username}`);
                const data = await res.json();
                console.log(data);
                setProducts(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setProducts([]);
            } finally {
                setFetchingProducts(false);
            }
        };

        getProducts();
    }, [username, showToast, setProducts, user]);


    useEffect(() => {
        const getAdds = async () => {
            if (!user) return;
            setFetchingAdds(true);
            try {
                const res = await fetch(`/api/adds/user/${username}`);
                const data = await res.json();
                console.log(data);
                setAdds(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setAdds([]);
            } finally {
                setFetchingAdds(false);
            }
        };

        getAdds();
    }, [username, showToast, setAdds, user]);

    useEffect(() => {
        const getPackages = async () => {
            if (!user) return;
            setFetchingPackages(true);
            try {
                const res = await fetch(`/api/packages/user/${username}`);
                const data = await res.json();
                console.log(data);
                setPackages(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setPackages([]);
            } finally {
                setFetchingPackages(false);
            }
        };

        getPackages();
    }, [username, showToast, setPackages, user]);

   

    const handleToggleDisplay = (displayType) => {
        if (displayType === "posts") {
            setDisplayPosts(true);
            setDisplayProducts(false);
            setDisplayAdds(false);
            setDisplayPackages(false);
        } else if (displayType === "products") {
            setDisplayPosts(false);
            setDisplayProducts(true);
            setDisplayAdds(false);
            setDisplayPackages(false);
        } else if (displayType === "adds") {
            setDisplayPosts(false);
            setDisplayProducts(false);
            setDisplayAdds(true);
            setDisplayPackages(false);
        } else if (displayType === "packages"){
            setDisplayPosts(false);
            setDisplayProducts(false);
            setDisplayAdds(false);
            setDisplayPackages(true);
        }
    };

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!user && !loading) return <h1>User not found</h1>;

    return (
        <>
            <UserHeader user={user} />

            <Flex justifyContent="center" mt={4}>
            <Button
                    mr={4}
                    onClick={() => handleToggleDisplay("posts")}
                    colorScheme={displayPosts ? "blue" : "gray"}
                >
                    Posts
                </Button>
                {user.isBusiness? (
                <Button
					
                    mr={4}
                    onClick={() => handleToggleDisplay("products")}
                    colorScheme={displayProducts ? "blue" : "gray"}
                >
                    Products
                </Button>):null}
                {user.isBusiness? (<Button
                    onClick={() => handleToggleDisplay("adds")}
                    colorScheme={displayAdds ? "blue" : "gray"}
                >
                    Advertisements
                </Button>
                ):null}
                {user.isConsultant ? (
                <Button
                    onClick={() => handleToggleDisplay("packages")}
                    colorScheme={displayPackages ? "blue" : "gray"}
                >
                    Packages
                </Button>
                ):null}
            </Flex>

            {displayPosts && (
                <>
                    {!fetchingPosts && posts.length === 0 && <h1>User has no posts.</h1>}
                    {fetchingPosts && (
                        <Flex justifyContent={"center"} my={12}>
                            <Spinner size={"xl"} />
                        </Flex>
                    )}

                    {posts.map((post) => (
                        <Post key={post._id} post={post} postedBy={post.postedBy} />
                    ))}
                </>
            )}

            {displayProducts && (
                <>
                    {!fetchingProducts && products.length === 0 && <h1>User has no products.</h1>}
                    {fetchingProducts && (
                        <Flex justifyContent={"center"} my={12}>
                            <Spinner size={"xl"} />
                        </Flex>
                    )}

                    {products.map((product) => (
                        <Product key={product._id} product={product} postedBy={product.postedBy} />
                    ))}
                </>
            )}

            {displayAdds && (
                <>
                    {!fetchingAdds && adds.length === 0 && <h1>No advertisements available.</h1>}
                    {fetchingAdds && (
                        <Flex justifyContent={"center"} my={12}>
                            <Spinner size={"xl"} />
                        </Flex>
                    )}

                    {adds.map((add) => (
                        <Add key={add._id} add={add} postedBy={add.postedBy} />
                    ))}
                </>
            )}

            {displayPackages && (
                <>
                    {!fetchingPackages && packages.length === 0 && <h1>No packages available.</h1>}
                    {fetchingPackages && (
                        <Flex justifyContent={"center"} my={12}>
                            <Spinner size={"xl"} />
                        </Flex>
                    )}

                    {packages.map((selectedPackage) => (
                        <Package key={selectedPackage._id} selectedPackage={selectedPackage} postedBy={selectedPackage.postedBy} />
                    ))}
                </>
            )}
        </>
    );
};

export default UserPage;
