

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useShowToast from "../../hooks/useShowToast";
// import { Flex, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Heading, Center} from "@chakra-ui/react"; // Assuming Button is imported from Chakra UI
// import CDAdd from "../../components/CDAdd";
// import useGetUserProfile from "../../hooks/useGetUserProfile";
// import { useRecoilState } from "recoil";
// import addAtom from "../../atoms/addAtoms";
// import UDSideBar from "../../components/udComponents/UDSideBar";

// import CreateAdd from "../../components/CreateAdd";

// const CDAdvertisementPage = () => {
//   const { user, loading } = useGetUserProfile();
//   const { username } = useParams();
//   const showToast = useShowToast();
//   const [adds, setAdds] = useRecoilState(addAtom);
//   const [fetchingAdds, setFetchingAdds] = useState(true);

//   useEffect(() => {
//     const getAdds = async () => {
//       if (!user) return;
//       setFetchingAdds(true);
//       try {
//         const res = await fetch(`/api/cadds/user/${username}`);
//         const data = await res.json();
//         console.log(data);
//         setAdds(data);
//       } catch (error) {
//         showToast("Error", error.message, "error");
//         setAdds([]);
//       } finally {
//         setFetchingAdds(false);
//       }
//     };

//     getAdds();
//   }, [username, showToast, setAdds, user]);

//   if (!user && loading) {
//     return (
//       <Flex justifyContent={"center"}>
//         <Spinner size={"xl"} />
//       </Flex>
//     );
//   }

//   if (!user && !loading) return <h1>User not found</h1>;


//   return (
    
//     <Box>
      
//     <Box paddingLeft="560px" paddingTop="100px">
      
//       <CreateAdd paddingLeft="350px" paddingTop="150px" />
//       <UDSideBar />
      
//       <Table variant="striped" colorScheme="brand" size="sm" >
      
//       <TableCaption>All post</TableCaption>
//         <Thead >
//           <Tr>
//             <Th isNumeric
//               bg="blue.500"
//               color="white"
//               >Text</Th>
//                         <Th isNumeric
//               bg="blue.500"
//               color="white"
//               >Image</Th>
//                         <Th isNumeric
//               bg="blue.500"
//               color="white"
//               >Likes Count</Th>
//                         <Th isNumeric
//               bg="blue.500"
//               color="white"
//               >Replies Count</Th>
//                         <Th isNumeric
//               bg="blue.500"
//               color="white"
//               >Created At</Th>
//                         <Th isNumeric
//               bg="blue.500"
//               color="white"
//               >Action</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {!fetchingAdds && adds.length === 0 && (
//             <Tr>
//               <Td colSpan="6">User has no posts.</Td>
//             </Tr>
//           )}
//           {fetchingAdds && (
//             <Tr>
//               <Td colSpan="6">
//                 <Flex justifyContent={"center"} my={12}>
//                   <Spinner size={"xl"} />
//                 </Flex>
//               </Td>
//             </Tr>
//           )}
//           {!fetchingAdds &&
//             adds.map((add) => (
//               <UDAdd key={add._id} add={add} postedBy={add.postedBy} />
//             ))}
//         </Tbody>
//       </Table>
//     </Box>
//     </Box>

//   );
// };



// export default UDAdvertisementPage;
