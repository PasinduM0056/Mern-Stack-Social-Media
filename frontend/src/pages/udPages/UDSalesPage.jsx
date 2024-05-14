import React, { useEffect } from "react";
import { Box, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useParams} from "react-router-dom";
import { useRecoilState} from "recoil";
import productsAtom from "../../atoms/productAtom";

import useGetUserProfile from "../../hooks/useGetUserProfile";
import useShowToast from "../../hooks/useShowToast";
import UDSales from "../../components/UDSales";
import UDSideBar from "../../components/udComponents/UDSideBar";

const UDSalesPage = () => {
    const { user, loading } = useGetUserProfile();
    const [products, setProducts] = useRecoilState(productsAtom);
    const showToast = useShowToast();
    const { pid } = useParams();

    const currentProduct = products[0];

    useEffect(() => {
        const getProduct = async () => {
            setProducts([]);
            try {
                const res = await fetch(`/api/products/${pid}`);
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setProducts([data]);
            } catch (error) {
                showToast("Error", error.message, "error");
            }
        };
        getProduct();
    }, [showToast, pid, setProducts]);

   

    if (!user && loading) {
        return (
            <Box justifyContent="center">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (!currentProduct) return null;

    // Calculate total rating and average rating
    let totalRating = 0;
    currentProduct.reviews.forEach((review) => {
        totalRating += Number(review.rating);
    });
    const averageRating = totalRating / currentProduct.reviews.length;

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
            <UDSideBar />
            <Box position="absolute" left="55%" w={{ base: "100%", md: "80%", lg: "750px" }} p={4} transform="translateX(-50%)">
                <Box borderRadius={6} overflow="hidden" border="1px solid" borderColor="gray.light" p={4}>
                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                        {currentProduct.productName}
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
                                <Td>{currentProduct.productDescription}</Td>
                                <Td>
                                    <Text style={{ textDecoration: "line-through", color: "red", fontWeight: "bold" }}>
                                        USD {currentProduct.productPrice}
                                    </Text>
                                </Td>
                                <Td>
                                    {currentProduct.productOfferPrice && (
                                        <Text style={{ color: "green", fontWeight: "bold" }}>
                                            USD {currentProduct.productOfferPrice}
                                        </Text>
                                    )}
                                </Td>
                                <Td>{renderStarRating()}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
                
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                        Sales
                    </Text>
                <Box mt={4}>
                    {currentProduct.buyers.map((buyer) => (
                        <UDSales
                            key={buyer._id}
                            buyer={buyer}
                            lastBuyer={buyer._id === currentProduct.buyers[currentProduct.buyers.length - 1]._id}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default UDSalesPage;
