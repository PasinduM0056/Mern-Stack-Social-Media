import { AddIcon } from "@chakra-ui/icons";
import {
	Button,
	CloseButton,
	Flex,
	FormControl,
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
import productAtom from "../atoms/productAtom";
import useShowToast from "../hooks/useShowToast";
import addsAtom from "../atoms/addAtoms";
import { useParams } from "react-router-dom";

const MAX_CHAR = 500;

const CreateAdd = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [addText, setAddText] = useState("");
	const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
	const imageRef = useRef(null);
	const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
	const user = useRecoilValue(userAtom);
    const product = useRecoilValue(productAtom);
	const showToast = useShowToast();
	const [loading, setLoading] = useState(false);
	const [adds, setAdds] = useRecoilState(addsAtom);
	const { username } = useParams();

	const handleTextChange = (e) => {
		const inputText = e.target.value;

		if (inputText.length > MAX_CHAR) {
			const truncatedText = inputText.slice(0, MAX_CHAR);
			setAddText(truncatedText);
			setRemainingChar(0);
		} else {
			setAddText(inputText);
			setRemainingChar(MAX_CHAR - inputText.length);
		}
	};

	const handleCreateAdd = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/adds/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ postedBy: user._id,addOf: product._id, text: addText, img: imgUrl }),
			});

			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post created successfully", "success");
			if (username === user.username) {
				setAdds([data, ...adds]);
			}
			onClose();
			setAddText("");
			setImgUrl("");
		} catch (error) {
			showToast("Error", error, "error");
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
				Advertisement
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Create Advertisement</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<Textarea
								placeholder='add content goes here..'
								onChange={handleTextChange}
								value={addText}
							/>
							<Text fontSize='xs' fontWeight='bold' textAlign={"right"} m={"1"} color={"gray.800"}>
								{remainingChar}/{MAX_CHAR}
							</Text>

							<Input type='file' hidden ref={imageRef} onChange={handleImageChange} />

							<BsFillImageFill
								style={{ marginLeft: "5px", cursor: "pointer" }}
								size={16}
								onClick={() => imageRef.current.click()}
							/>
						</FormControl>

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
						<Button colorScheme='blue' mr={3} onClick={handleCreateAdd} isLoading={loading}>
							Create Add
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateAdd;