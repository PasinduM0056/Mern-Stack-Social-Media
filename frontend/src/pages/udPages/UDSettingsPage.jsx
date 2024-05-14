import React, { useState, useEffect } from "react";
import { Button, Text, Box, Flex } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import useLogout from "../../hooks/useLogout";
import BusinessProfileForm from "./../BusinessProfileForm";
import { useNavigate } from 'react-router-dom';
import userAtom from "./../../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Link } from 'react-router-dom';
import UDSideBar from "../../components/udComponents/UDSideBar";

const UDSettingsPage = ({ isBusiness }) => {
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const logout = useLogout();
  const [showForm, setShowForm] = useState(false);
  const [isBusinessAccount, setIsBusinessAccount] = useState(isBusiness);
  const navigate = useNavigate();

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

  const freezeAccount = async () => {
    if (!window.confirm("Are you sure you want to freeze your account?")) return;

    try {
      const res = await fetch("/api/users/freeze", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }
      if (data.success) {
        await logout();
        showToast("Success", "Your account has been frozen", "success");
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <Box paddingLeft="350px" paddingTop="100px">
      <UDSideBar />
      <Box
        position={"absolute"}
        left={"50%"}
        w={{ base: "100%", md: "80%", lg: "750px" }}
        p={4}
        transform={"translateX(-50%)"}
      >
        {!showForm ? (
          <Flex flexDirection="row">
            <Box mr={4}>
              <Flex flexDirection="row">
                <Text my={1} fontWeight={"bold"}>
                  Freeze Your Account
                </Text>
              </Flex>
              <Text my={1}>You can unfreeze your account anytime by logging in.</Text>
              <Button size={"sm"} colorScheme="red" onClick={freezeAccount}>
                Freeze
              </Button>
            </Box>
            <Box>
              <Text my={1} fontWeight={"bold"}>
                Business Account
              </Text>
              {isBusinessAccount ? (
                <Text my={1}>Open your Business Dashboard</Text>
              ) : (
                <Text my={1}>Update your account to Business</Text>
              )}
              {isBusinessAccount ? (
                <Link to={`/userDashboard/${user.username}/udhome`}>
                  <Button size="sm" colorScheme="green">
                    Open Dashboard
                  </Button>
                </Link>
              ) : (
                <Button size={"sm"} colorScheme="red" onClick={toggleForm}>
                  Switch to Business Profile
                </Button>
              )}
            </Box>
            <Box ml={4}>
              <Text my={1} fontWeight={"bold"}>
                User Page
              </Text>
              <Link to={`/${user.username}`}>
                <Button size="sm" colorScheme="blue">
                  Go to User Page
                </Button>
              </Link>
            </Box>
            
          </Flex>
        ) : (
          <BusinessProfileForm toggleForm={toggleForm} />
        )}
      </Box>
    </Box>
  );
};

export default UDSettingsPage;
