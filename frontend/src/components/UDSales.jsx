import { Avatar, Divider, Flex, Text, Icon } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const UDSales = ({ buyer, lastBuyer }) => {
  
  

  return (
    <>
      <Flex gap={4} py={2} my={2} w="full">

        <Flex gap={1} w="full" flexDirection="column">
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              {buyer.buyerName}
            </Text>
          </Flex>
          <Text>{buyer.buyerAddress}</Text>
          <Text>{buyer.buyerPhoneNumber}</Text>
        </Flex>
      </Flex>
      {!lastBuyer ? <Divider /> : null}
    </>
  );
};

export default UDSales;
