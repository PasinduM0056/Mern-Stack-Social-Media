import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import ProductActions from "../components/ProductActions";
import BuyAction from "../components/BuyAction";
import { useEffect } from "react";
import ProductComment from "../components/ProductComment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import productsAtom from "../atoms/productAtom";

const ProductPage = () => {
    const { user, loading } = useGetUserProfile();
    const [products, setProducts] = useRecoilState(productsAtom);
    const showToast = useShowToast();
    const { pid } = useParams();
    const currentUser = useRecoilValue(userAtom);
    const navigate = useNavigate();

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

    const handleDeleteProduct = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete this product?")) return;

            const res = await fetch(`/api/products/${currentProduct._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Product deleted", "success");
            navigate(`/${user.username}`);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
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
            <Flex alignItems="center">
                {stars}
                <Text ml={2}>{averageRating.toFixed(1)}</Text>
            </Flex>
        );
    };

    return (
        <>
            <Flex>
                <Flex w={"full"} alignItems={"center"} gap={3}>
                    <Avatar src={user.profilePic} size={"md"} name='Mark Zuckerberg' />
                    <Flex>
                        <Text fontSize={"sm"} fontWeight={"bold"}>
                            {user.username}
                        </Text>
                        <Image src='/verified.png' w='4' h={4} ml={4} />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
                        {formatDistanceToNow(new Date(currentProduct.createdAt))} ago
                    </Text>

                    {currentUser?._id === user._id && (
                        <DeleteIcon size={20} cursor={"pointer"} onClick={handleDeleteProduct} />
                    )}
                </Flex>
            </Flex>

            <Flex justifyContent="center">
                <Box
                    borderRadius={6}
                    overflow={"hidden"}
                    border={"1px solid"}
                    borderColor={"gray.light"}
                    p={4}
                    maxW={"450px"}
                >
                    <Text fontSize={"lg"} fontWeight={"bold"} mb={2}>
                        {currentProduct.productName}
                    </Text>
                    {currentProduct.productImg && (
                        <Box mb={4}>
                            <Image src={currentProduct.productImg} alt={currentProduct.productName} />
                        </Box>
                    )}
                    <Text fontSize={"sm"} mb={2}>
                        {currentProduct.productDescription}
                    </Text>
                    <Text fontSize={"sm"}>
                        <span style={{ textDecoration: "line-through", color: "red", fontWeight: "bold" }}>
                            USD {currentProduct.productPrice}
                        </span>
                        {currentProduct.productOfferPrice && (
                            <span style={{ color: "green", fontWeight: "bold" }}>
                                {" "}
                                Offer USD {currentProduct.productOfferPrice}
                            </span>
                        )}
                    </Text>
                    {renderStarRating()}
                    <BuyAction product={currentProduct} />
                    
                    
                </Box>
            </Flex>

            <Flex gap={3} my={3}>
                <ProductActions product={currentProduct} />
            </Flex>

            <Divider my={4} />

            <Flex justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"2xl"}>👋</Text>
                    <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>

            <Divider my={4} />
            {currentProduct.reviews.map((review) => (
                <ProductComment
                    key={review._id}
                    review={review}
                    lastReview={review._id === currentProduct.reviews[currentProduct.reviews.length - 1]._id}
                />
            ))}
        </>
    );
};

export default ProductPage;