import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import CAddActions from "./CAddActions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import caddsAtom from "../atoms/caddAtoms";



const CAdd = ({ cadd, postedBy}) => {
	const [user, setUser] = useState(null);
	const showToast = useShowToast();
	const currentUser = useRecoilValue(userAtom);
	const [cadds, setCAdds] = useRecoilState(caddsAtom);
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

	

	const handleDeleteCAdd = async (e) => {
		try {
			e.preventDefault();
			if (!window.confirm("Are you sure you want to delete this add?")) return;

			const res = await fetch(`/api/cadds/${cadd._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Add deleted", "success");
			setCAdds(cadds.filter((a) => a._id !== cadd._id));
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	if (!user) return null;
	return (
		<Link to={`/${user.username}/cadd/${cadd._id}`}>
			<Flex gap={3} mb={4} py={5}>
				<Flex flexDirection={"column"} alignItems={"center"}>
					<Avatar
						size='md'
						name={user.name}
						src={user?.profilePic}
						onClick={(e) => {
							e.preventDefault();
							navigate(`/${user.username}`);
						}}
					/>
					<Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
					<Box position={"relative"} w={"full"}>
						{cadd.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
						{cadd.replies[0] && (
							<Avatar
								size='xs'
								name='John doe'
								src={cadd.replies[0].userProfilePic}
								position={"absolute"}
								top={"0px"}
								left='15px'
								padding={"2px"}
							/>
						)}

						{cadd.replies[1] && (
							<Avatar
								size='xs'
								name='John doe'
								src={cadd.replies[1].userProfilePic}
								position={"absolute"}
								bottom={"0px"}
								right='-5px'
								padding={"2px"}
							/>
						)}

						{cadd.replies[2] && (
							<Avatar
								size='xs'
								name='John doe'
								src={cadd.replies[2].userProfilePic}
								position={"absolute"}
								bottom={"0px"}
								left='4px'
								padding={"2px"}
							/>
						)}
					</Box>
				</Flex>
				<Flex flex={1} flexDirection={"column"} gap={2}>
					<Flex justifyContent={"space-between"} w={"full"}>
						<Flex w={"full"} alignItems={"center"}>
							<Text
								fontSize={"sm"}
								fontWeight={"bold"}
								onClick={(e) => {
									e.preventDefault();
									navigate(`/${user.username}`);
								}}
							>
								{user?.username}
							</Text>
							{user.isConsultant && <Image src='/verified.png' w={4} h={4} ml={1} />}
							
						</Flex>
						<Flex gap={4} alignItems={"center"}>
							<Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
								{formatDistanceToNow(new Date(cadd.createdAt))} ago
							</Text>

							{currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeleteCAdd} />}
						</Flex>
					</Flex>
					
							<Text fontSize={"sm"}>{cadd.text}</Text>
							{cadd.img && (
								<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
									<Image src={cadd.img} w={"full"} />
								</Box>
							)}
						
					<Flex gap={3} my={1}>
						<CAddActions cadd={cadd} />
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
};

export default CAdd;