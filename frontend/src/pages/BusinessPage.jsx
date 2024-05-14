import { Box, Flex, Spinner, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Product from "../components/Product";
import { useRecoilState } from "recoil";
import productsAtom from "../atoms/productAtom";
import SuggestedUsers from "../components/SuggestedUsers";
import { SearchIcon } from "@chakra-ui/icons";

const BusinessPage = () => {
	const [products, setProducts] = useRecoilState(productsAtom);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const showToast = useShowToast();

	useEffect(() => {
		const getFeedProducts = async () => {
			setLoading(true);
			setProducts([]);
			try {
				const res = await fetch(`/api/products/feed?search=${searchTerm}`);
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				setProducts(data);
			} catch (error) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getFeedProducts();
	}, [searchTerm, showToast, setProducts]);

	return (
		<Flex gap="10" alignItems="flex-start">
			<Box flex={70}>
				<InputGroup mb={4}>
					<InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
					<Input
						placeholder="Search products by name"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</InputGroup>

				{!loading && products.length === 0 && <h1>Follow some Businesses to see the Products</h1>}

				{loading && (
					<Flex justify="center">
						<Spinner size="xl" />
					</Flex>
				)}

				{Array.isArray(products) &&
					products.map((product) => <Product key={product._id} product={product} postedBy={product.postedBy} />)}
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

export default BusinessPage;
