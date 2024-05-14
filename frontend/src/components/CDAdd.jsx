import React from "react";
import { Box, Flex, Text, Image, IconButton, Tr, Th, Td } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import caddsAtom from "../atoms/caddAtoms";
import useShowToast from "../hooks/useShowToast";

const CDAdd = ({ cadd, postedBy }) => {
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const [cadds, setCAdds] = useRecoilState(caddsAtom);

  const handleDeleteCAdd = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/cadds/${cadd._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setCAdds(cadds.filter((a) => a._id !== cadd._id));
      showToast("Success", "Post deleted", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    
    <Tr>
      <Td>{cadd && cadd.text}</Td>
      <Td>
        {cadd && cadd.img && (
         <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
            <Image src={cadd.img} w={"100px"} />
        </Box>
         )}
        </Td>
        <Td>{cadd.likes && cadd.likes.length}</Td>
        <Td>{cadd.replies && cadd.replies.length}</Td>
        <Td>{formatDistanceToNow(new Date(cadd.createdAt))} ago</Td>
        <Td>
        {currentUser?._id === postedBy && (
          <IconButton
            icon={<DeleteIcon />}
            size="sm"
            aria-label="Delete Post"
            onClick={handleDeleteCAdd}
          />
        )}
        </Td>
    </Tr>
  );
};

export default CDAdd;