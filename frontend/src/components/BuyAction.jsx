import {
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import productsAtom from "../atoms/productAtom";

const BuyAction = ({ product }) => {
    const user = useRecoilValue(userAtom);
    const [products, setProducts] = useRecoilState(productsAtom);
    const [isBuying, setIsBuying] = useState(false);
    const [buyerName, setBuyerName] = useState("");
    const [buyerAddress, setBuyerAddress] = useState("");
    const [buyerPhoneNumber, setBuyerPhoneNumber] = useState("");

    const showToast = useShowToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleBuy = async () => {
        if (!user) return showToast("Error", "You must be logged in to buy a product", "error");
        if (isBuying) return;
        setIsBuying(true);
        try {
            const res = await fetch("/api/products/buy/" + product._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    buyerName: buyerName,
                    buyerAddress: buyerAddress,
                    buyerPhoneNumber: buyerPhoneNumber,
                }),
            });
            const data = await res.json();
            if (data.error) return showToast("Error", data.error, "error");

            const updatedProducts = products.map((p) => {
                if (p._id === product._id) {
                    // Ensure p.buys is an array before spreading
                    const updatedBuys = Array.isArray(p.buys) ? p.buys : [];
                    return { ...p, buys: [...updatedBuys, data] };
                }
                return p;
            });
            setProducts(updatedProducts);
            showToast("Success", "Product bought successfully", "success");
            onClose();
            setBuyerName("");
            setBuyerAddress("");
            setBuyerPhoneNumber("");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsBuying(false);
        }
    };

    return (
        <Flex flexDirection="column">
            <Button onClick={onOpen} colorScheme="blue" size="sm">
                Buy
            </Button>

            <Flex gap={2} alignItems="center">
                <Text color="gray.light" fontSize="sm">
                    {product.buyers ? product.buyers.length : 0} sales
                </Text>
                <Box w={0.5} h={0.5} borderRadius="full" bg="gray.light"></Box>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Buy Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input
                                placeholder="Your name"
                                value={buyerName}
                                onChange={(e) => setBuyerName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Your Address"
                                value={buyerAddress}
                                onChange={(e) => setBuyerAddress(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Your Phone Number"
                                value={buyerPhoneNumber}
                                onChange={(e) => setBuyerPhoneNumber(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" size="sm" mr={3} isLoading={isBuying} onClick={handleBuy}>
                            Buy
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default BuyAction;
