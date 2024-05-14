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
import packagesAtom from "../atoms/packagesAtom";

const CDPackage = ({ packageItem, postedBy }) => {
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const currentUser = useRecoilValue(userAtom);
    const [packages, setPackages] = useRecoilState(packagesAtom);

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

    const handleDeletePackage = async (e) => {
        try {
            e.preventDefault();
            if (!window.confirm("Are you sure you want to delete this post?")) return;

            const res = await fetch(`/api/packages/${packageItem._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Package deleted", "success");
            setPackages(packages.filter((p) => p._id !== packageItem._id));
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    if (!user) return null;

   
   
    

    return (
        <Tr>
        <Td><Link to={`/userDashBoard/${user.username}/udPackage/${packageItem._id}`}>{packageItem.packageName} </Link></Td>
        <Td>{packageItem.packageDescription}</Td>
        <Td>{packageItem.packagePrice}</Td>
        <Td>{packageItem.packageOfferPrice}</Td>
        <Td>
          {packageItem.packageImg && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
              <Image src={packageItem.packageImg} w={"100px"} />
            </Box>
          )}
        </Td>
        <Td>{packageItem.likes?.length}</Td>
        <Td>{packageItem.reviews?.length}</Td>
        <Td>{packageItem.buyers?.length}</Td>

        <Td>{formatDistanceToNow(new Date(packageItem.createdAt))} ago</Td>
        <Td>
          {currentUser?._id === postedBy && (
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              aria-label="Delete Post"
              onClick={handleDeletePackage}
            />
          )}
        </Td>
      </Tr>
    );
};

export default CDPackage;