import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import packageAtom from "../atoms/packagesAtom";
import PackageActions from "./PackageActions";

const Package = ({ selectedPackage, postedBy }) => {
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);
    const [packages, setPackages] = useRecoilState(packageAtom);
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

    const handleDeletePackage = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete this post?")) return;

            const res = await fetch(`/api/packages/${selectedPackage._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Package deleted", "success");
            setPackages(packages.filter((p) => p._id !== selectedPackage._id));
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    if (!user) return null;

    // Calculate total rating and average rating
    let totalRating = 0;
    selectedPackage.reviews.forEach((review) => {
        totalRating += Number(review.rating);
    });
    const averageRating = totalRating / selectedPackage.reviews.length;

    return (
        <Link to={`/${user.username}/package/${selectedPackage._id}`}>
            <Flex p={4} border="1px solid" borderColor="gray.200" borderRadius="md" alignItems="center">
                <Avatar size="md" name={user.name} src={user.profilePic} />
                <Box flex="1" ml={4}>
                    <Text fontWeight="bold">{selectedPackage.packageName}</Text>
                    <Text fontSize="sm" color="gray.600">
                        Posted by {user.username} {user.isBusiness && <Image src='/verified.png' alt='Verified' w={3} h={3} />}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        {formatDistanceToNow(new Date(selectedPackage.createdAt))} ago
                    </Text>
                    <Flex alignItems="center" mt={2}>
                        {[...Array(5)].map((_, index) => (
                            <StarIcon key={index} color={index < Math.floor(averageRating) ? "yellow.500" : "gray.300"} />
                        ))}
                        <Text ml={1} fontSize="sm" color="gray.500">
                            {averageRating.toFixed(1)}
                        </Text>
                    </Flex>
                </Box>
                {currentUser?._id === user._id && (
                    <IconButton
                        icon={<DeleteIcon />}
                        variant="ghost"
                        colorScheme="red"
                        aria-label="Delete"
                        onClick={handleDeletePackage}
                    />
                )}
            </Flex>
        </Link>
    );
};

export default Package;
