import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import PackageActions from "../components/PackageActions";
// import BuyAction from "../components/BuyAction";
import { useEffect } from "react";
import PackageComment from "../components/PackageComment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import packagesAtom from "../atoms/packagesAtom";

const PackagePage = () => {
    const { user, loading } = useGetUserProfile();
    const [packages, setPackages] = useRecoilState(packagesAtom);
    const showToast = useShowToast();
    const { pid } = useParams();
    const currentUser = useRecoilValue(userAtom);
    const navigate = useNavigate();

    const currentPackage= packages[0];

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

    const handleDeletePackage = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete this package?")) return;

            const res = await fetch(`/api/packages/${currentPackage._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Package deleted", "success");
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
                        {formatDistanceToNow(new Date(currentPackage.createdAt))} ago
                    </Text>

                    {currentUser?._id === user._id && (
                        <DeleteIcon size={20} cursor={"pointer"} onClick={handleDeletePackage} />
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
                        {currentPackage.packageName}
                    </Text>
                    {currentPackage.packageImg && (
                        <Box mb={4}>
                            <Image src={currentPackage.packageImg} alt={currentPackage.packageName} />
                        </Box>
                    )}
                    <Text fontSize={"sm"} mb={2}>
                        {currentPackage.packageDescription}
                    </Text>
                    <Text fontSize={"sm"}>
                        <span style={{ textDecoration: "line-through", color: "red", fontWeight: "bold" }}>
                            USD {currentPackage.packagePrice}
                        </span>
                        {currentPackage.packageOfferPrice && (
                            <span style={{ color: "green", fontWeight: "bold" }}>
                                {" "}
                                Offer USD {currentPackage.packageOfferPrice}
                            </span>
                        )}
                    </Text>
                    {renderStarRating()}
                    {/* <BuyAction package={currentPackage} /> */}
                    
                    
                </Box>
            </Flex>

            <Flex gap={3} my={3}>
                <PackageActions selectedPackage={currentPackage} />
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
            {currentPackage.reviews.map((review) => (
                <PackageComment
                    key={review._id}
                    review={review}
                    lastReview={review._id === currentPackage.reviews[currentPackage.reviews.length - 1]._id}
                />
            ))}
        </>
    );
};

export default PackagePage;