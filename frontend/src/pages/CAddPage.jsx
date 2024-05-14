import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import CAddActions from "../components/CAddAction";
import { useEffect } from "react";
import CAddComment from "../components/CAddComment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import caddsAtom from "../atoms/caddAtoms";


const CAddPage = () => {
	const { user, loading } = useGetUserProfile();
	const [cadds, setCAdds] = useRecoilState(caddsAtom);
	const showToast = useShowToast();
	const { pid } = useParams();
	const currentUser = useRecoilValue(userAtom);
	const navigate = useNavigate();

	const currentCAdd = cadds[0];

	useEffect(() => {
		const getCAdd = async () => {
			setCAdds([]);
			try {
				const res = await fetch(`/api/cadds/${pid}`);
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setCAdds([data]);
			} catch (error) {
				showToast("Error", error.message, "error");
			}
		};
		getCAdd();
	}, [showToast, pid, setCAdds]);

	const handleDeleteCAdd = async () => {
		try {
			if (!window.confirm("Are you sure you want to delete this post?")) return;

			const res = await fetch(`/api/cadds/${currentCAdd._id}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post deleted", "success");
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

	if (!currentCAdd) return null;
	console.log("currentCAdd", currentCAdd);

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
						{formatDistanceToNow(new Date(currentCAdd.createdAt))} ago
					</Text>

					{currentUser?._id === user._id && (
						<DeleteIcon size={20} cursor={"pointer"} onClick={handleDeleteCAdd} />
					)}
				</Flex>
			</Flex>

			<Text my={3}>{currentCAdd.text}</Text>

			{currentCAdd.img && (
				<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
					<Image src={currentCAdd.img} w={"full"} />
				</Box>
			)}

			<Flex gap={3} my={3}>
				<CAddActions cadd={currentCAdd} />
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
			{currentCAdd.replies.map((reply) => (
				<CAddComment
					key={reply._id}
					reply={reply}
					lastReply={reply._id === currentCAdd.replies[currentCAdd.replies.length - 1]._id}
				/>
			))}
		</>
	);
};

export default CAddPage;