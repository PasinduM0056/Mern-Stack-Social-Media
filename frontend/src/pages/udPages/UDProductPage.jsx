import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import { Flex, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td, TableCaption, Input, Button } from "@chakra-ui/react"; // Assuming Button is imported from Chakra UI
import UDProduct from "../../components/UDProduct";
import useGetUserProfile from "../../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import productsAtom from "../../atoms/productAtom";
import CreateProduct from "../../components/CreateProduct";
import UDSideBar from "../../components/udComponents/UDSideBar";

// Import library for generating PDF, for example, jsPDF
import jsPDF from "jspdf";

const UDProductPage = () => {
    const { user, loading } = useGetUserProfile();
    const { username } = useParams();
    const showToast = useShowToast();
    
    const [products, setProducts] = useRecoilState(productsAtom);
    const [fetchingProducts, setFetchingProducts] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const getProducts = async () => {
            if (!user) return;
            setFetchingProducts(true);
            try {
                let url = `/api/products/user/${username}`;
                // Append search query if it exists
                if (searchQuery) {
                    url += `?productName=${searchQuery}`;
                }
                const res = await fetch(url);
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setProducts([]);
            } finally {
                setFetchingProducts(false);
            }
        };

        getProducts();
    }, [username, searchQuery, showToast, setProducts, user]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to generate PDF report
    const generatePDFReport = async () => {
        try {
            // Fetch product data
            const res = await fetch(`/api/products/user/${username}${searchQuery ? `?productName=${searchQuery}` : ''}`);
            const productsData = await res.json();
    
            // Create a new jsPDF instance
            const doc = new jsPDF();
    
            // Add content to the PDF
            doc.text("Product Report", 10, 10);
            doc.text("This is a report of all products", 10, 20);
    
            // Loop through products and add them to the PDF
            let yPosition = 30;
            productsData.forEach((product, index) => {
                const { productName, productDescription, productPrice, productOffer, productImage, likes, reviews, sales, createdAt } = product;
                const rowData = [
                    productName,
                    productDescription,
                    productPrice,
                    productOffer,
                    productImage,
                    likes,
                    reviews,
                    sales,
                    createdAt
                ];
                rowData.forEach((data, colIndex) => {
                    doc.text(`${data}`, 10 + colIndex * 40, yPosition);
                });
                yPosition += 10;
            });
    
            // Save the PDF
            doc.save("product_report.pdf");
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
        <Box paddingLeft="405px" paddingTop="100px">
            <CreateProduct paddingLeft="350px" paddingTop="150px" />
            <UDSideBar />
  
            <Input
                type="text"
                placeholder="Search by product name"
                value={searchQuery}
                onChange={handleSearchInputChange}
                style={{ width: "300px", marginBottom: "20px" }} 
            />
            
            {/* Add the button for generating PDF report */}
            <Button onClick={generatePDFReport} marginBottom="20px">Generate PDF Report</Button>
  
            <Table variant="striped" colorScheme="brand" size="sm">
                <TableCaption>All products</TableCaption>
                <Thead>
                    <Tr>
                        <Th isNumeric bg="blue.500" color="white">Product Name</Th>
                        <Th isNumeric bg="blue.500" color="white">Product Description</Th>
                        <Th isNumeric bg="blue.500" color="white">Product Price</Th>
                        <Th isNumeric bg="blue.500" color="white">Product Offer</Th>
                        <Th isNumeric bg="blue.500" color="white">Product Image</Th>
                        <Th isNumeric bg="blue.500" color="white">Likes</Th>
                        <Th isNumeric bg="blue.500" color="white">Reviews</Th>
                        <Th isNumeric bg="blue.500" color="white">Sales</Th>
                        <Th isNumeric bg="blue.500" color="white">Created At</Th>
                        <Th isNumeric bg="blue.500" color="white">Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {!fetchingProducts && products.length === 0 && (
                        <Tr>
                            <Td colSpan="6">User has no products.</Td>
                        </Tr>
                    )}
                    {fetchingProducts && (
                        <Tr>
                            <Td colSpan="6">
                                <Flex justifyContent={"center"} my={12}>
                                    <Spinner size={"xl"} />
                                </Flex>
                            </Td>
                        </Tr>
                    )}
                    {!fetchingProducts &&
                        products.map((product) => (
                            <UDProduct key={product._id} product={product} postedBy={product.postedBy} />
                        ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default UDProductPage;
