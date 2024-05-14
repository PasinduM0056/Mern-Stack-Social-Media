import React, { useEffect } from "react";
import { Box, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useParams} from "react-router-dom";
import { useRecoilState} from "recoil";
import packagesAtom from "../../atoms/packagesAtom";

import useGetUserProfile from "../../hooks/useGetUserProfile";
import useShowToast from "../../hooks/useShowToast";
import UDSales from "../../components/UDSales";
import CDSideBar from "../../components/udComponents/CDSideBar";

const CDBuyersPage = () => {
    const { user, loading } = useGetUserProfile();
    const [packages, setPackages] = useRecoilState(packagesAtom);
    const showToast = useShowToast();
    const { pid } = useParams();

    const currentPackage = packages[0];

    useEffect(() => {
        const getPackage = async () => {
            setPackages([]);
            try {
                const res = await fetch(`/api/packages/${pid}`);
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setPackages([data]);
            } catch (error) {
                showToast("Error", error.message, "error");
            }
        };
        getPackage();
    }, [showToast, pid, setPackages]);

   

    if (!user && loading) {
        return (
            <Box justifyContent="center">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (!currentPackage) return null;

    // Calculate total rating and average rating
    let totalRating = 0;
    currentPackage.reviews.forEach((review) => {
        totalRating += Number(review.rating);
    });
    const averageRating = totalRating / currentPackage.reviews.length;

    // Function to render star icons based on the average rating
    const renderStarRating = () => {
        const stars = Array.from({ length: 5 }, (_, index) => (
            <StarIcon
                key={`star-${index}`}
                color={index < Math.floor(averageRating) ? "yellow.400" : "gray.200"}
            />
        ));

        return (
            <Box alignItems="center">
                {stars}
                <Text ml={2}>{averageRating.toFixed(1)}</Text>
            </Box>
        );
    };

    return (
        <Box paddingLeft="450px" paddingTop="50px">
            <CDSideBar />
            <Box position="absolute" left="55%" w={{ base: "100%", md: "80%", lg: "750px" }} p={4} transform="translateX(-50%)">
                <Box borderRadius={6} overflow="hidden" border="1px solid" borderColor="gray.light" p={4}>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        {currentPackage.packageName}
                    </Text>
                    <Table variant="striped" colorScheme="brand" size="sm">
                        <Thead>
                            <Tr>
                                <Th bg="blue.500" color="white">Description</Th>
                                <Th bg="blue.500" color="white">Price</Th>
                                <Th bg="blue.500" color="white">Offer Price</Th>
                                <Th bg="blue.500" color="white">Rating</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>{currentPackage.packageDescription}</Td>
                                <Td>
                                    <Text style={{ textDecoration: "line-through", color: "red", fontWeight: "bold" }}>
                                        USD {currentPackage.packagePrice}
                                    </Text>
                                </Td>
                                <Td>
                                    {currentPackage.packageOfferPrice && (
                                        <Text style={{ color: "green", fontWeight: "bold" }}>
                                            USD {currentPackage.packageOfferPrice}
                                        </Text>
                                    )}
                                </Td>
                                <Td>{renderStarRating()}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
                
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Buyers
                    </Text>
                <Box mt={4}>
                    {currentPackage.buyers.map((buyer) => (
                        <UDSales
                            key={buyer._id}
                            buyer={buyer}
                            lastBuyer={buyer._id === currentPackage.buyers[currentPackage.buyers.length - 1]._id}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default CDBuyersPage;
