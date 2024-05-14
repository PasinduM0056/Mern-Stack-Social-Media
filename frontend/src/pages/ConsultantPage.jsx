import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Package from "../components/Package";
import { useRecoilState } from "recoil";
import packagesAtom from "../atoms/packagesAtom";
import SuggestedUsers from "../components/SuggestedUsers";

const ConsultantPage = () => {
	const [packages, setPackages] = useRecoilState(packagesAtom);
	const [loading, setLoading] = useState(true);
	const showToast = useShowToast();
	useEffect(() => {
		const getFeedPackages = async () => {
				setLoading(true);
				setPackages([]);
			try {
				const res = await fetch("/api/packages/feed");
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				console.log(data);
				setPackages(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedPackages();
	}, [showToast, setPackages]);

	return (
		<Flex gap='10' alignItems={"flex-start"}>
			<Box flex={70}>
				{!loading && packages.length === 0 && <h1>Follow some Consultants to see the Packages</h1>}

				{loading && (
					<Flex justify='center'>
						<Spinner size='xl' />
					</Flex>
				)}

		{Array.isArray(packages) && packages.map((selectedPackage) => (
			<Package key={selectedPackage._id} selectedPackage={selectedPackage} postedBy={selectedPackage.postedBy} />
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

export default ConsultantPage;