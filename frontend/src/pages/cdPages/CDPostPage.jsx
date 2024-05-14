import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import { Flex, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Heading, Center} from "@chakra-ui/react"; // Assuming Button is imported from Chakra UI
import CDPost from "../../components/CDPost";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../../atoms/postsAtom";
import CDSideBar from "../../components/cdComponents/CDSideBar";
import CreatePost from "../../components/CreatePost";

const CDPostPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

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

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!user && !loading) return <h1>User not found</h1>;

  return (
    <Box>
      
    <Box paddingLeft="560px" paddingTop="100px">
      
      <CreatePost paddingLeft="350px" paddingTop="150px" />
      <CDSideBar />
      
      <Table variant="striped" colorScheme="brand" size="sm" >
      
      <TableCaption>All post</TableCaption>
        <Thead >
          <Tr>
            <Th isNumeric
              bg="blue.500"
              color="white"
              >Text</Th>
                        <Th isNumeric
              bg="blue.500"
              color="white"
              >Image</Th>
                        <Th isNumeric
              bg="blue.500"
              color="white"
              >Likes Count</Th>
                        <Th isNumeric
              bg="blue.500"
              color="white"
              >Replies Count</Th>
                        <Th isNumeric
              bg="blue.500"
              color="white"
              >Created At</Th>
                        <Th isNumeric
              bg="blue.500"
              color="white"
              >Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!fetchingPosts && posts.length === 0 && (
            <Tr>
              <Td colSpan="6">User has no posts.</Td>
            </Tr>
          )}
          {fetchingPosts && (
            <Tr>
              <Td colSpan="6">
                <Flex justifyContent={"center"} my={12}>
                  <Spinner size={"xl"} />
                </Flex>
              </Td>
            </Tr>
          )}
          {!fetchingPosts &&
            posts.map((post) => (
              <CDPost key={post._id} post={post} postedBy={post.postedBy} />
            ))}
        </Tbody>
      </Table>
    </Box>
    </Box>
  );
};



export default CDPostPage;
