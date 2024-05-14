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
  Box,
  } from "@chakra-ui/react";
  import { useRef, useState,useEffect } from "react";
  import { useRecoilState } from "recoil";
  import userAtom from "../../atoms/userAtom";
  import usePreviewImg from "../../hooks/usePreviewImg";
  import useShowToast from "../../hooks/useShowToast";
  import UDSideBar from "../../components/udComponents/UDSideBar";
  
  export default function UpdateProfilePage(isBusiness) {
	const [user, setUser] = useRecoilState(userAtom);
	const [isBusinessAccount, setIsBusinessAccount] = useState(isBusiness);
	const [inputs, setInputs] = useState({
	  username: user.username,
	  email: user.email,
	  bio: user.bio,
	  name: user.name,
	  address: user.address,
	  idNumber: user.idNumber,
	  companyName: user.companyName,
	  companyAbout: user.companyAbout,
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
		const res = await fetch(`/api/users/update/${user._id}`, {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
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

	useEffect(() => {
		// Fetch isBusiness status when component mounts
		checkIsBusiness();
	  }, []);
	
	  const checkIsBusiness = async () => {
		try {
		  const res = await fetch("/api/users/check-business", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		  });
		  const data = await res.json();
	
		  if (data.error) {
			return showToast("Error", data.error, "error");
		  }
	
		  // Update isBusinessAccount state based on the response
		  setIsBusinessAccount(data.isBusiness);
		} catch (error) {
		  showToast("Error", error.message, "error");
		}
	  };
	
	  const toggleForm = () => {
		setShowForm(!showForm);
	  };
  
	return (
    
    

    <Box paddingLeft="400px" paddingTop="10px">
     <UDSideBar/>
     <Box
			position={"absolute"}
			left={"55%"}
			w={{ base: "100%", md: "80%", lg: "750px" }}
			p={1}
			transform={"translateX(-50%)"}
		>
	  <form onSubmit={handleSubmit}>
		<Flex align={"center"} justify={"center"} my={4}>
		  <Stack
			spacing={2}
			w={"full"}
			maxW={"md"}
			bg={useColorModeValue("white", "gray.dark")}
			rounded={"xl"}
			boxShadow={"lg"}
			p={4}
		  >
			{isBusinessAccount ? (
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
			Update Business Profile
		  </Heading>
          ) : (
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
			  Update User Profile
			</Heading>
          )}
			
			<FormControl id="userName">
			  <Stack direction={["column", "row"]} spacing={6}>
				<Center>
				  <Avatar
					size="xl"
					boxShadow={"md"}
					src={imgUrl || user.profilePic}
				  />
				</Center>
				<Center w="full">
				  <Button w="full" onClick={() => fileRef.current.click()}>
					Change Avatar
				  </Button>
				  <Input
					type="file"
					hidden
					ref={fileRef}
					onChange={handleImageChange}
				  />
				</Center>
			  </Stack>
			</FormControl>
			{!isBusinessAccount ? (
			  <>
				<FormControl>
				  <FormLabel>User name</FormLabel>
				  <Input
					placeholder="johndoe"
					value={inputs.username}
					onChange={(e) =>
					  setInputs({ ...inputs, username: e.target.value })
					}
					_placeholder={{ color: "gray.500" }}
					type="text"
				  />
				</FormControl>
				<FormControl>
				  <FormLabel>Email address</FormLabel>
				  <Input
					placeholder="your-email@example.com"
					value={inputs.email}
					onChange={(e) =>
					  setInputs({ ...inputs, email: e.target.value })
					}
					_placeholder={{ color: "gray.500" }}
					type="email"
				  />
				</FormControl>
				<FormControl>
				  <FormLabel>Bio</FormLabel>
				  <Input
					placeholder="Your bio."
					value={inputs.bio}
					onChange={(e) =>
					  setInputs({ ...inputs, bio: e.target.value })
					}
					_placeholder={{ color: "gray.500" }}
					type="text"
				  />
				</FormControl>
				
			  </>
			) : (
			  <>
				<FormControl>
				  <FormLabel>Name</FormLabel>
				  <Input
					placeholder="johndoe"
					value={inputs.name}
					onChange={(e) =>
					  setInputs({ ...inputs, name: e.target.value })
					}
					_placeholder={{ color: "gray.500" }}
					type="text"
				  />
				</FormControl>
				<FormControl>
				  <FormLabel>Address</FormLabel>
				  <Input
					placeholder="your-email@example.com"
					value={inputs.address}
					onChange={(e) =>
					  setInputs({ ...inputs, address: e.target.value })
					}
					_placeholder={{ color: "gray.500" }}
					type="text"
				  />
				</FormControl>
				<FormControl>
				  <FormLabel>ID Number</FormLabel>
				  <Input
					placeholder="Your bio."
					value={inputs.idNumber}
					onChange={(e) =>
					  setInputs({ ...inputs, idNumber: e.target.value })
					}
					_placeholder={{ color: "gray.500" }}
					type="text"
				  />
				</FormControl>
				<FormControl>
				  <FormLabel>Business Name</FormLabel>
				  <Input
					placeholder="Your bio."
					value={inputs.companyName}
					onChange={(e) =>
					  setInputs({ ...inputs, companyName: e.target.value })
					}
					_placeholder={{ color: "gray.500" }}
					type="text"
				  />
				</FormControl>
				<FormControl>
				  <FormLabel>Business About</FormLabel>
				  <Input
					placeholder="Your bio."
					value={inputs.companyAbout}
					onChange={(e) =>
					  setInputs({ ...inputs, companyAbout: e.target.value })
					}
					_placeholder={{ color: "gray.500" }}
					type="text"
				  />
				</FormControl>
				
			  </>
			)}
			<FormControl>
				  <FormLabel>Password</FormLabel>
				  <Input
					placeholder="password"
					value={inputs.password}
					onChange={(e) =>
					  setInputs({ ...inputs, password: e.target.value })
					}
					_placeholder={{ color: "gray.500" }}
					type="password"
				  />
				</FormControl>
			<Stack spacing={6} direction={["column", "row"]}>
			  <Button
				bg={"red.400"}
				color={"white"}
				w="full"
				_hover={{
				  bg: "red.500",
				}}
			  >
				Cancel
			  </Button>
			  <Button
				bg={"green.400"}
				color={"white"}
				w="full"
				_hover={{
				  bg: "green.500",
				}}
				type="submit"
				isLoading={updating}
			  >
				Submit
			  </Button>
			</Stack>
		  </Stack>
		</Flex>
	  </form>
    </Box>
    </Box>
    
	);
  }
  