import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import Add from "../components/Add";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import addsAtom from "../atoms/addAtoms";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
	const [posts, setPosts] = useRecoilState(postsAtom);
	const [adds, setAdds] = useRecoilState(addsAtom);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();
	useEffect(() => {
		const getFeedPosts = async () => {
			setLoading(true);
			setPosts([]);
			try {
				const res = await fetch("/api/posts/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log(data);
				setPosts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedPosts();
	}, [showToast, setPosts]);

	useEffect(() => {
		const getFeedAdds = async () => {
			setLoading(true);
			setAdds([]);
			try {
				const res = await fetch("/api/adds/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log(data);
				setAdds(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedAdds();
	}, [showToast, setAdds]);

	return (
		<Flex gap='10' alignItems={"flex-start"}>
			<Box flex={70}>
				{!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

				{loading && (
					<Flex justify='center'>
						<Spinner size='xl' />
					</Flex>
				)}

		{Array.isArray(posts) && posts.map((post) => (
			<Post key={post._id} post={post} postedBy={post.postedBy} />
		))}

{Array.isArray(adds) && adds.map((add) => (
			<Add key={add._id} add={add} postedBy={add.postedBy} />
		))}
			</Box>
			
			<Box
				flex={30}
				display={{
					base: "none",
					md: "block",
				}}
			>
				<SuggestedUsers />
			</Box>
		</Flex>
	);
};

export default HomePage;
