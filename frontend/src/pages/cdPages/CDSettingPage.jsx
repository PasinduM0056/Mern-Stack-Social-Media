import React, { useState, useEffect } from "react";
import { Button, Text, Box, Flex } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import useLogout from "../../hooks/useLogout";
import ConsultantProfileForm from "./../ConsultantProfileForm";
import { useNavigate } from 'react-router-dom';
import userAtom from "./../../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Link } from 'react-router-dom';
import CDSideBar from "../../components/udComponents/CDSideBar";

const CDSettingsPage = ({ isConsulatant }) => {
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const logout = useLogout();
  const [showForm, setShowForm] = useState(false);
  const [isConsultantAccount, setIsConsultantAccount] = useState(isConsulatant);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch isConsultant status when component mounts
    checkIsConsultant();
  }, []);

  const checkIsConsultant = async () => {
    try {
      const res = await fetch("/api/users/check-consultant", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }

      // Update isConsultantAccount state based on the response
      setIsConsultantAccount(data.isConsultant);
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
      <CDSideBar />
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
                Consultant Account
              </Text>
              {isConsultantAccount ? (
                <Text my={1}>Open your Consultant Dashboard</Text>
              ) : (
                <Text my={1}>Update your account to Consultant</Text>
              )}
              {isConsultantAccount ? (
                <Link to={`/userDashboard/${user.username}/udhome`}>
                  <Button size="sm" colorScheme="green">
                    Open Dashboard
                  </Button>
                </Link>
              ) : (
                <Button size={"sm"} colorScheme="red" onClick={toggleForm}>
                  Switch to Consultant Profile
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
          <ConsultantProfileForm toggleForm={toggleForm} />
        )}
      </Box>
    </Box>
  );
};

export default CDSettingsPage;
