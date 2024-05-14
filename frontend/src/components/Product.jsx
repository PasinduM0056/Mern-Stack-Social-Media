import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import ProductActions from "./ProductActions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import productsAtom from "../atoms/productAtom";

const Product = ({ product, postedBy }) => {
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);
    const [products, setProducts] = useRecoilState(productsAtom);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch("/api/users/profile/" + postedBy);
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setUser(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                setUser(null);
            }
        };

        getUser();
    }, [postedBy, showToast]);

    const handleDeleteProduct = async (e) => {
        try {
            e.preventDefault();
            if (!window.confirm("Are you sure you want to delete this post?")) return;

            const res = await fetch(`/api/products/${product._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Product deleted", "success");
            setProducts(products.filter((p) => p._id !== product._id));
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    if (!user) return null;

    // Calculate total rating and average rating
    let totalRating = 0;
    product.reviews.forEach((review) => {
        totalRating += Number(review.rating);
    });
    const averageRating = totalRating / product.reviews.length;

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
        <Link to={`/${user.username}/product/${product._id}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar
                        size='md'
                        name={user.name}
                        src={user?.profilePic}
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${user.username}`);
                        }}
                    />
                    <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
                    <Box position={"relative"} w={"full"}>
                        {product.reviews.length === 0 && <Text textAlign={"center"}>🥱</Text>}
                        {product.reviews[0] && (
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={product.reviews[0].userProfilePic}
                                position={"absolute"}
                                top={"0px"}
                                left='15px'
                                padding={"2px"}
                            />
                        )}

                        {product.reviews[1] && (
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={product.reviews[1].userProfilePic}
                                position={"absolute"}
                                bottom={"0px"}
                                right='-5px'
                                padding={"2px"}
                            />
                        )}

                        {product.reviews[2] && (
                            <Avatar
                                size='xs'
                                name='John doe'
                                src={product.reviews[2].userProfilePic}
                                position={"absolute"}
                                bottom={"0px"}
                                left='4px'
                                padding={"2px"}
                            />
                        )}
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text
                                fontSize={"sm"}
                                fontWeight={"bold"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/${user.username}`);
                                }}
                            >
                                {user?.username}
                            </Text>
                            {user.isBusiness || user.isConsultant || user.isOrganization && <Image src='/verified.png' w={4} h={4} ml={1} />}
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
                                {formatDistanceToNow(new Date(product.createdAt))} ago
                            </Text>

                            {currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeleteProduct} />}
                        </Flex>
                    </Flex>

                    <Box
                        borderRadius={6}
                        overflow={"hidden"}
                        border={"1px solid"}
                        borderColor={"gray.light"}
                        p={4}
                        maxW={"450px"}
                    >
                        <Text fontSize={"lg"} fontWeight={"bold"} mb={2}>
                            {product.productName}
                        </Text>
                        {product.productImg && (
                            <Box mb={4}>
                                <Image src={product.productImg} alt={product.productName} />
                            </Box>
                        )}
                        <Text fontSize={"sm"} mb={2}>
                            {product.productDescription}
                        </Text>
                        <Text fontSize={"sm"}>
                            <span style={{ textDecoration: "line-through", color: "red", fontWeight: "bold" }}>
                                USD {product.productPrice}
                            </span>
                            {product.productOfferPrice && (
                                <span style={{ color: "green", fontWeight: "bold" }}>
                                    {" "}
                                    Offer USD {product.productOfferPrice}
                                </span>
                            )}
                        </Text>
                        {renderStarRating()} {/* Render the star rating */}
                    </Box>

                    <Flex gap={3} my={1}>
                        <ProductActions product={product} />
                    </Flex>
                </Flex>
            </Flex>
        </Link>
    );
};

export default Product;