
import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Textarea, VStack, FormErrorMessage } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";

const OrganizationProfileForm = ({ toggleForm }) => {
  const showToast = useShowToast();
  const [formData, setFormData] = useState({
    OrganizationName: "",
    OrganizationAddress: "",
    OrganizationAbout: "",
    IDnumber: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    // Restrict input to numbers only for ID Number
    if (name === "IDnumber") {
      newValue = value.replace(/\D/g, ""); // Remove non-digit characters
      // Limit length to 12 characters
      newValue = newValue.slice(0, 12);
    }
    setFormData({ ...formData, [name]: newValue });
    // Clear error message when user starts typing
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    // Validate form fields
    if (!formData.OrganizationName) {
      errors.OrganizationName = "Organization Name is required";
    }
    if (!formData.OrganizationAddress) {
      errors.OrganizationAddress = "Organization Address is required";
    }
    if (!formData.OrganizationAbout) {
      errors.OrganizationAbout = "About the Organization is required";
    }
    if (!formData.IDnumber) {
      errors.IDnumber = "ID Number is required";
    } else if (formData.IDnumber.length !== 12) {
      errors.IDnumber = "ID Number must be 12 digits long";
    }

    if (Object.keys(errors).length > 0) {
      // If there are errors, set them and prevent form submission
      setFormErrors(errors);
    } else {
      try {
        // Send form data to backend for updating user profile
        const res = await fetch("/api/users/organization-profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (res.ok) {
          showToast("Success", "Oranization profile updated successfully", "success");
          toggleForm(); // Close the form
        } else {
          showToast("Error", data.error || "Failed to update organization profile", "error");
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl id="OrganizationName" isRequired isInvalid={!!formErrors.OrganizationName}>
          <FormLabel>Organization Name</FormLabel>
          <Input
            type="text"
            name="OrganizationName"
            value={formData.OrganizationName}
            onChange={handleChange}
          />
          <FormErrorMessage>{formErrors.OrganizationName}</FormErrorMessage>
        </FormControl>
        <FormControl id="OrganizationAddress" isRequired isInvalid={!!formErrors.OrganizationAddress}>
          <FormLabel>Organization Address</FormLabel>
          <Input
            type="text"
            name="OrganizationAddress"
            value={formData.OrganizationAddress}
            onChange={handleChange}
          />
          <FormErrorMessage>{formErrors.OrganizationAddress}</FormErrorMessage>
        </FormControl>
        <FormControl id="OrganizationAbout" isRequired isInvalid={!!formErrors.OrganizationAbout}>
          <FormLabel>About the Organization</FormLabel>
          <Textarea
            name="OrganizationAbout"
            value={formData.OrganizationAbout}
            onChange={handleChange}
          />
          <FormErrorMessage>{formErrors.OrganizationAbout}</FormErrorMessage>
        </FormControl>
        <FormControl id="IDnumber" isRequired isInvalid={!!formErrors.IDnumber}>
          <FormLabel>ID Number</FormLabel>
          <Input
            type="text"
            name="IDnumber"
            value={formData.IDnumber}
            onChange={handleChange}
          />
          <FormErrorMessage>{formErrors.IDnumber}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="blue" type="submit">
          Submit
        </Button>
        <Button colorScheme="gray" onClick={toggleForm}>
          Cancel
        </Button>
      </VStack>
    </form>
  );
};

export default OrganizationProfileForm;
