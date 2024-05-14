import React from "react";
import { Box, Flex, Text, Image, IconButton, Tr, Th, Td } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import useShowToast from "../hooks/useShowToast";

const UDPost = ({ post, postedBy }) => {
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setPosts(posts.filter((p) => p._id !== post._id));
      showToast("Success", "Post deleted", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    
    <Tr>
      <Td>{post.text}</Td> {/* Adjusted cell */}
      <Td>
        {post.img && (
          <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
            <Image src={post.img} w={"100px"} />
          </Box>
        )}
      </Td>
      <Td>{post.likes.length}</Td> {/* Adjusted cell */}
      <Td>{post.replies.length}</Td> {/* Adjusted cell */}
      <Td>{formatDistanceToNow(new Date(post.createdAt))} ago</Td> {/* Adjusted cell */}
      <Td>
        {currentUser?._id === postedBy && (
          <IconButton
            icon={<DeleteIcon />}
            size="sm"
            aria-label="Delete Post"
            onClick={handleDeletePost}
          />
        )}
      </Td>
    </Tr>
  );
};

export default UDPost;
