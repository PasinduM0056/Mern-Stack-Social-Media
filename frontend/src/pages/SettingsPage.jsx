import React, { useState, useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";
import BusinessProfileForm from "./BusinessProfileForm";
import ConsultantProfileForm from "./ConsultantProfileForm";
import OrganizationProfileForm from "./OrganizationProfileForm";
import { useNavigate } from 'react-router-dom';
import userAtom from "./../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Link } from 'react-router-dom';
import TermsAndConditions from "./TermsAndConditions";

const SettingsPage = ({ isBusiness, isConsultant, isOrganization }) => {
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const logout = useLogout();
  const [showForm, setShowForm] = useState(false);
  const [isBusinessAccount, setIsBusinessAccount] = useState(isBusiness);
  const [isConsultantAccount, setIsConsultantAccount] = useState(isConsultant);
  const [isOrganizationAccount, setIsOrganizationAccount] = useState(isOrganization); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch isBusiness status when component mounts
    checkIsBusiness();
  }, []);

  useEffect(() => {
    // Fetch isConsultant status when component mounts
    checkIsConsultant();
  }, []);

  useEffect(() => {
    // Fetch isConsultant status when component mounts
    checkIsOrganization();
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

  const checkIsOrganization = async () => {
    try {
      const res = await fetch("/api/users/check-organization", {
        // Assuming there's an endpoint to check organization status
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.error) {
        return showToast("Error", data.error, "error");
      }

      // Update isOrganizationAccount state based on the response
      setIsOrganizationAccount(data.isOrganization);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const toggleForm = (isBusinessForm) => {
    setShowForm(true);
    setIsBusinessAccount(isBusinessForm);
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
    <>
      {!showForm ? (
        <>
          <Text my={1} fontWeight={"bold"}>
            Freeze Your Account
          </Text>
          <Text my={1}>You can unfreeze your account anytime by logging in.</Text>
          <Button size={"sm"} colorScheme="red" onClick={freezeAccount}>
            Freeze
          </Button>
          
          {!isConsultantAccount && !isOrganizationAccount && (
            <>
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
                <Button size={"sm"} colorScheme="red" onClick={() => toggleForm(true)}>
                  Switch to Business Profile
                </Button>
              )}
            </>
          )}

          {!isBusinessAccount && !isOrganizationAccount && (
            <>
              <Text my={1} fontWeight={"bold"}>
                Consultant Account
              </Text>
              {isConsultantAccount ? (
                <Text my={1}>Open your Consultant Dashboard</Text>
              ) : (
                <Text my={1}>Update your account to Consultant</Text>
              )}
              
              {isConsultantAccount ? (
                <Link to={`/consultantDashboard/${user.username}/cdhome`}>
                  <Button size="sm" colorScheme="green">
                    Open Dashboard
                  </Button>
                </Link>
              ) : (
                <Button size={"sm"} colorScheme="red" onClick={() => toggleForm(false)}>
                  Switch to Consultant Profile
                </Button>
              )}
            </>
          )}

          {!isBusinessAccount && !isConsultantAccount && (
            <>
              <Text my={1} fontWeight={"bold"}>
                Organization Account
              </Text>
              {isOrganizationAccount ? (
                <Text my={1}>Open your Consultant Dashboard</Text>
              ) : (
                <Text my={1}>Update your account to Consultant</Text>
              )}
              
              {isOrganizationAccount ? (
                <Link to={`/organization-Home`}>
                  <Button size="sm" colorScheme="green">
                    Open Dashboard
                  </Button>
                </Link>
              ) : (
                <Button size={"sm"} colorScheme="red" onClick={() => toggleForm(false)}>
                  Switch to Organization Profile
                </Button>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {isBusinessAccount ? (
            <BusinessProfileForm toggleForm={() => setShowForm(false)} />
          ) : !isConsultantAccount ? (
            <ConsultantProfileForm toggleForm={() => setShowForm(false)} />
          ) :  (
            <OrganizationProfileForm toggleForm={() => setShowForm(false)} />
          )}
        </>
      )}

      <Text my={1} fontWeight={"bold"}>
        Terms and Conditions
      </Text>
      <Text my={1}>You can view all Terms and Conditions of SoulLift!</Text>
      <Link to="/terms">
        <Button size={"sm"} colorScheme="red">
          T&C
        </Button>
      </Link>

      <Text my={1} fontWeight={"bold"}>
        User Activity Report
      </Text>
      <Text my={1}>You can view all your activity of your require time period!</Text>
      <Link to="/activityreport">
        <Button size={"sm"} colorScheme="red">
          Activity Report
        </Button>
      </Link>
    </>
  );
};

export default SettingsPage;
