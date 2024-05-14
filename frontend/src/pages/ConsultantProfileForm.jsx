import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
	Avatar,
	Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";
import useShowToast from "../hooks/useShowToast";

export default function UpdateProfilePage() {
	const [user, setUser] = useRecoilState(userAtom);
	const [inputs, setInputs] = useState({
		name: user.name,
		address: user.address,
		idNumber: user.idNumber,
		experienses: user.experienses,
		qualification: user.qualification,
	  	password: "",
	});
	const fileRef = useRef(null);
	const [updating, setUpdating] = useState(false);

	const showToast = useShowToast();

	const { handleImageChange, imgUrl } = usePreviewImg();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (updating) return;
		setUpdating(true);
		try {
			const res = await fetch(`/api/users/consultant-profile/${user._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...inputs, identityVerify: imgUrl }),
			});
			const data = await res.json(); // updated user object
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Profile updated successfully", "success");
			setUser(data);
			localStorage.setItem("user-threads", JSON.stringify(data));
		} catch (error) {
			showToast("Error", error, "error");
		} finally {
			setUpdating(false);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<Flex align={"center"} justify={"center"} my={6}>
				<Stack
					spacing={4}
					w={"full"}
					maxW={"md"}
					bg={useColorModeValue("white", "gray.dark")}
					rounded={"xl"}
					boxShadow={"lg"}
					p={6}
				>
					<Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
						Switch to Consultant Profile
					</Heading>
					<FormControl>
						<FormLabel>Name</FormLabel>
						<Input
							placeholder='johndoe'
							value={inputs.name}
							onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='text'
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Address</FormLabel>
						<Input
							placeholder='your-email@example.com'
							value={inputs.address}
							onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='text'
						/>
					</FormControl>
					<FormControl>
						<FormLabel>ID Number</FormLabel>
						<Input
							placeholder='Your bio.'
							value={inputs.idNumber}
							onChange={(e) => setInputs({ ...inputs, idNumber: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='text'
						/>
					</FormControl>
          <FormControl>
						<FormLabel>Experienses</FormLabel>
						<Input
							placeholder='Your bio.'
							value={inputs.experienses}
							onChange={(e) => setInputs({ ...inputs, experienses: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='text'
						/>
					</FormControl>
          <FormControl>
						<FormLabel>Qualifications</FormLabel>
						<Input
							placeholder='Your bio.'
							value={inputs.qualification}
							onChange={(e) => setInputs({ ...inputs, qualification: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='text'
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input
							placeholder='password'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							_placeholder={{ color: "gray.500" }}
							type='password'
						/>
					</FormControl>
          			<FormControl id='userName'>
						<Stack direction={["column", "row"]} spacing={6}>
							<Center>
								<Avatar size='xl' boxShadow={"md"} src={imgUrl || user.identityVerify} />
							</Center>
							<Center w='full'>
								<Button w='full' onClick={() => fileRef.current.click()}>
									Verify Identity
								</Button>
								<Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
							</Center>
						</Stack>
					</FormControl>
					<Stack spacing={6} direction={["column", "row"]}>
						<Button
							bg={"red.400"}
							color={"white"}
							w='full'
							_hover={{
								bg: "red.500",
							}}
						>
							Cancel
						</Button>
						<Button
							bg={"green.400"}
							color={"white"}
							w='full'
							_hover={{
								bg: "green.500",
							}}
							type='submit'
							isLoading={updating}
						>
							Submit
						</Button>
					</Stack>
				</Stack>
			</Flex>
		</form>
	);
}
