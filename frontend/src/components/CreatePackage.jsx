import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { useParams } from "react-router-dom";

const CreatePackage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageOfferPrice, setPackageOfferPrice] = useState("");
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const imageRef = useRef(null);
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const { username } = useParams();

  const handleCreatePackage = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/packages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          packageName,
          packageDescription,
          packagePrice,
          packageOfferPrice,
          packageImg: imgUrl,
        }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Package created successfully", "success");
      onClose();
      setPackageName("");
      setPackageDescription("");
      setPackagePrice("");
      setPackageOfferPrice("");
      setImgUrl("");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
				right={5}
        bg={useColorModeValue("gray.300", "indigo.300")}
        onClick={onOpen}
        size={{ base: "sm", sm: "md" }}
      >
        Package
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Package</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Package Name</FormLabel>
              <Input
                placeholder='Enter package name'
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Package Description</FormLabel>
              <Textarea
                placeholder='Enter package description'
                value={packageDescription}
                onChange={(e) => setPackageDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Package Price</FormLabel>
              <Input
                type='number'
                placeholder='Enter package price'
                value={packagePrice}
                onChange={(e) => setPackagePrice(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Package Offer Price</FormLabel>
              <Input
                type='number'
                placeholder='Enter package offer price'
                value={packageOfferPrice}
                onChange={(e) => setPackageOfferPrice(e.target.value)}
              />
            </FormControl>

            <Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

            <BsFillImageFill
              style={{ marginLeft: "5px", cursor: "pointer" }}
              size={16}
              onClick={() => imageRef.current.click()}
            />

            {imgUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imgUrl} alt='Selected img' />
                <CloseButton
                  onClick={() => {
                    setImgUrl("");
                  }}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreatePackage} isLoading={loading}>
              Create Package
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePackage;