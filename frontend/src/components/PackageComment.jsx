import { Avatar, Divider, Flex, Text, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const PackageComment = ({ review, lastReview }) => {
  // Function to render star icons based on the rating
  const renderStarRating = () => {
    const rating = parseInt(review.rating); // Parse rating to integer
    const fullStars = Array.from({ length: rating }, (_, index) => (
      <StarIcon key={`full-star-${index}`} color="yellow.400" />
    ));
    const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
      <StarIcon key={`empty-star-${index}`} color="gray.200" />
    ));

    return (
      <>
        {fullStars}
        {emptyStars}
      </>
    );
  };

  return (
    <>
      <Flex gap={4} py={2} my={2} w="full">
        <Avatar src={review.userProfilePic} size="sm" />
        <Flex gap={1} w="full" flexDirection="column">
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              {review.username}
            </Text>
            <Flex gap={1}>{renderStarRating()}</Flex>
          </Flex>
          <Text>{review.text}</Text>
        </Flex>
      </Flex>
      {!lastReview ? <Divider /> : null}
    </>
  );
};

export default PackageComment;