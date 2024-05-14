import React from "react";
import { Box, Flex, Text, Image, IconButton, Tr, Th, Td } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import addsAtom from "../atoms/addAtoms";
import useShowToast from "../hooks/useShowToast";

const UDAdd = ({ add, postedBy }) => {
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const [adds, setAdds] = useRecoilState(addsAtom);

  const handleDeleteAdd = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/adds/${add._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setAdds(adds.filter((a) => a._id !== add._id));
      showToast("Success", "Post deleted", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    
    <Tr>
      <Td>{add && add.text}</Td>
      <Td>
        {add && add.img && (
         <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
            <Image src={add.img} w={"100px"} />
        </Box>
         )}
        </Td>
        <Td>{add.likes && add.likes.length}</Td>
        <Td>{add.replies && add.replies.length}</Td>
        <Td>{formatDistanceToNow(new Date(add.createdAt))} ago</Td>
        <Td>
        {currentUser?._id === postedBy && (
          <IconButton
            icon={<DeleteIcon />}
            size="sm"
            aria-label="Delete Post"
            onClick={handleDeleteAdd}
          />
        )}
        </Td>
    </Tr>
  );
};

export default UDAdd;