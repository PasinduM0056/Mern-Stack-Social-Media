import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Flex, Spinner, Box, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react"; 
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import productsAtom from "../atoms/productAtom";

const UDProduct = ({ product, postedBy }) => {
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);
    const [products, setProducts] = useRecoilState(productsAtom);

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

    const handleDeleteProduct = async (e) => {
        try {
            e.preventDefault();
            if (!window.confirm("Are you sure you want to delete this post?")) return;

            const res = await fetch(`/api/products/${product._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Product deleted", "success");
            setProducts(products.filter((p) => p._id !== product._id));
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    if (!user) return null;

   
   
    

    return (
        <Tr>
        <Td><Link to={`/userDashBoard/${user.username}/udProduct/${product._id}`}>{product.productName} </Link></Td>
        <Td>{product.productDescription}</Td>
        <Td>{product.productPrice}</Td>
        <Td>{product.productOfferPrice}</Td>
        <Td>
          {product.productImg && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
              <Image src={product.productImg} w={"100px"} />
            </Box>
          )}
        </Td>
        <Td>{product.likes?.length}</Td>
        <Td>{product.reviews?.length}</Td>
        <Td>{product.buyers?.length}</Td>

        <Td>{formatDistanceToNow(new Date(product.createdAt))} ago</Td>
        <Td>
          {currentUser?._id === postedBy && (
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              aria-label="Delete Post"
              onClick={handleDeleteProduct}
            />
          )}
        </Td>
      </Tr>
    );
};

export default UDProduct;
