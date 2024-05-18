import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import PackageActions from "../components/PackageActions";
// import BuyAction from "../components/BuyAction";
import { useEffect } from "react";
//import PackageComment from "../components/PackageComment";
import JobComment from "../components/jobComment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import packagesAtom from "../atoms/packagesAtom";
import jobsAtom from "../atoms/jobsAtom";

const JobPage = () => {
    const { user, loading } = useGetUserProfile();
    const [jobs, setJobs] = useRecoilState(jobsAtom);
    const showToast = useShowToast();
    const { pid } = useParams();
    const currentUser = useRecoilValue(userAtom);
    const navigate = useNavigate();

    const currentJob= jobs[0];

    useEffect(() => {
        const getJobs = async () => {
            setJobs([]);
            try {
                const res = await fetch(`/api/jobs/${pid}`);
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
        getJobs();
    }, [showToast, pid, setJobs]);

    const handleDeleteJob = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete this job?")) return;

            const res = await fetch(`/api/jobs/${currentJob._id}`, {
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
    currentJob.reviews.forEach((review) => {
        totalRating += Number(review.rating);
    });
    const averageRating = totalRating / currentJob.reviews.length;

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
                        {formatDistanceToNow(new Date(currentJob.createdAt))} ago
                    </Text>

                    {currentUser?._id === user._id && (
                        <DeleteIcon size={20} cursor={"pointer"} onClick={handleDeleteJob} />
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
                        {currentJob.jobName}
                    </Text>
                    {currentJob.jobImg && (
                        <Box mb={4}>
                            <Image src={currentJob.jobImg} alt={currentJob.jobName} />
                        </Box>
                    )}
                    <Text fontSize={"sm"} mb={2}>
                        {currentJob.jobDescription}
                    </Text>
                    <Text fontSize={"sm"}>
                        <span style={{ textDecoration: "line-through", color: "red", fontWeight: "bold" }}>
                            USD {currentJob.jobPrice}
                        </span>
                        {currentJob.jobOfferPrice && (
                            <span style={{ color: "green", fontWeight: "bold" }}>
                                {" "}
                                Offer USD {currentJob.jobOfferPrice}
                            </span>
                        )}
                    </Text>
                    {renderStarRating()}
                    {/* <BuyAction package={currentPackage} /> */}
                    
                    
                </Box>
            </Flex>

            <Flex gap={3} my={3}>
                <JobActions selectedJob={currentJob} />
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
            {currentJob.reviews.map((review) => (
                <JobComment
                    key={review._id}
                    review={review}
                    lastReview={review._id === currentJob.reviews[currentJob.reviews.length - 1]._id}
                />
            ))}
        </>
    );
};

export default JobPage;