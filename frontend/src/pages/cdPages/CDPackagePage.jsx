import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import { Flex, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td,TableCaption } from "@chakra-ui/react"; // Assuming Button is imported from Chakra UI
import CDPackage from "../../components/CDPackage";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import packageAtom from "../../atoms/packagesAtom";
import CreatePackage from "../../components/CreatePackage";
import CDSideBar from "../../components/udComponents/CDSideBar";

const CDPackagePage = () => {
    const { user, loading } = useGetUserProfile();
    const { username } = useParams();
    const showToast = useShowToast();
    
    const [packages, setPackages] = useRecoilState(packageAtom);
    
    const [fetchingPackages, setFetchingPackages] = useState(true);

   

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

   

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        );
    }

    if (!user && !loading) return <h1>User not found</h1>;

    return (
        <Box paddingLeft="405px" paddingTop="100px">
        <CreatePackage paddingLeft="350px" paddingTop="150px" />
        <CDSideBar />
  
        <Table variant="striped" colorScheme="brand" size="sm">
        <TableCaption>All packages</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric
  bg="blue.500"
  color="white">Package Name</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Package Description</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Package Price</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Package Offer</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Package Image</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Likes</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Reviews</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Sales</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Created At</Th>
              <Th isNumeric
  bg="blue.500"
  color="white">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!fetchingPackages && packages.length === 0 && (
              <Tr>
                <Td colSpan="6">User has no packages.</Td>
              </Tr>
            )}
            {fetchingPackages && (
              <Tr>
                <Td colSpan="6">
                  <Flex justifyContent={"center"} my={12}>
                    <Spinner size={"xl"} />
                  </Flex>
                </Td>
              </Tr>
            )}
            {!fetchingPackages &&
              packages.map((packageItem) => (
                <CDPackage key={packageItem._id} packageItem={packageItem} postedBy={packageItem.postedBy} />
              ))}
          </Tbody>
        </Table>
      </Box>
    );
};

export default CDPackagePage;