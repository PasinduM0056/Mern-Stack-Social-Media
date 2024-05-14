import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import { Flex, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Input, Button } from "@chakra-ui/react";
import UDAdd from "../../components/UDAdd";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import addAtom from "../../atoms/addAtoms";
import UDSideBar from "../../components/udComponents/UDSideBar";
import jsPDF from "jspdf";
import CreateAdd from "../../components/CreateAdd";

const UDAdvertisementPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const [adds, setAdds] = useRecoilState(addAtom);
  const [fetchingAdds, setFetchingAdds] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getAdds = async () => {
      if (!user) return;
      setFetchingAdds(true);
      try {
        let url = `/api/adds/user/${username}`;
        if (searchQuery) {
          url += `?text=${searchQuery}`;
        }
        const res = await fetch(url);
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
  }, [username, searchQuery, showToast, setAdds, user]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const generatePDFReport = async () => {
    try {
      const res = await fetch(`/api/adds/user/${username}${searchQuery ? `?text=${searchQuery}` : ''}`);
      const addsData = await res.json();
      const doc = new jsPDF();
      doc.text("Advertisement Report", 10, 10);
      doc.text("This is a report of all advertisements", 10, 20);
      let yPosition = 30;
      addsData.forEach((add, index) => {
        const { text, image, likesCount, repliesCount, createdAt } = add;
        const rowData = [
          text,
          image,
          likesCount,
          repliesCount,
          createdAt
        ];
        rowData.forEach((data, colIndex) => {
          doc.text(`${data}`, 10 + colIndex * 40, yPosition);
        });
        yPosition += 10;
      });
      doc.save("advertisement_report.pdf");
    } catch (error) {
      console.error("Error generating PDF report:", error);
      showToast("Error", "Failed to generate PDF report", "error");
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
    <Box>
      <Box paddingLeft="560px" paddingTop="100px">
        <CreateAdd paddingLeft="350px" paddingTop="150px" />
        <UDSideBar />
        <Input
          type="text"
          placeholder="Search by text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{ width: "300px", marginBottom: "20px" }} 
        />
        <Button onClick={generatePDFReport} marginBottom="20px">Generate PDF Report</Button>
        <Table variant="striped" colorScheme="brand" size="sm">
          <TableCaption>All Advertisements</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric bg="blue.500" color="white">Text</Th>
              <Th isNumeric bg="blue.500" color="white">Image</Th>
              <Th isNumeric bg="blue.500" color="white">Likes Count</Th>
              <Th isNumeric bg="blue.500" color="white">Replies Count</Th>
              <Th isNumeric bg="blue.500" color="white">Created At</Th>
              <Th isNumeric bg="blue.500" color="white">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!fetchingAdds && adds.length === 0 && (
              <Tr>
                <Td colSpan="6">User has no posts.</Td>
              </Tr>
            )}
            {fetchingAdds && (
              <Tr>
                <Td colSpan="6">
                  <Flex justifyContent={"center"} my={12}>
                    <Spinner size={"xl"} />
                  </Flex>
                </Td>
              </Tr>
            )}
            {!fetchingAdds &&
              adds.map((add) => (
                <UDAdd key={add._id} add={add} postedBy={add.postedBy} />
              ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default UDAdvertisementPage;
