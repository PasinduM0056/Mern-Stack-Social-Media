import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import useShowToast from "../../hooks/useShowToast";
import "./updatePostedJobs.css";
const UpdatePostedJobs = () => {
  const { id } = useParams(); // Get the job ID from the URL parameters
  const navigate = useNavigate(); // Used to navigate to other pages
  const showToast = useShowToast(); // Custom hook for showing toasts

  // State for storing job details and loading status
  const [jobDetails, setJobDetails] = useState({
    submissionMethod: "",
    applicationDeadline: "",
    skills: "",
    jobAbout: "",
    responsibilites: "",
    qualifications: "",
    jobTitle: "",
    salary: "",
    email: "",
    experience: "",
    other: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        // Fetch the existing job details
        const response = await axios.get(`/api/jobpost/Get-jobs-by-id/${id}`);
        setJobDetails(response.data.job);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        showToast("Error fetching job details", "error");
      }
    };

    fetchJobDetails();
  }, [id, showToast]);

  const handleChange = (e) => {
    // Update the job details state when the input fields change
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      // Send a PUT request to update the job details
      await axios.put(`/api/jobpost/update-posted-jobs/${id}`, jobDetails);

      // Show a success toast
      showToast("Job details updated successfully", "success");

      // Navigate back to the posted jobs page
      navigate("/posted-jobs");
    } catch (error) {
      console.error("Error updating job details:", error);
      showToast("Error updating job details", "error");
    }
  };

  if (loading) {
    // Display a spinner while loading
    return <Spinner />;
  }

  return (
    <div class="updatejob-form-container">
      <form class="updatejob-form">
        <div class="updatejob-form-group">
          <Box p={4}>
            <VStack spacing={4}>
              <FormControl id="jobTitle">
                <FormLabel>Job Title</FormLabel>
                <Input
                  name="jobTitle"
                  value={jobDetails.jobTitle}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="applicationDeadline">
                <FormLabel>Application Deadline</FormLabel>
                <Input
                  name="applicationDeadline"
                  type="date"
                  value={jobDetails.applicationDeadline}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="skills">
                <FormLabel>Skills</FormLabel>
                <Textarea
                  name="skills"
                  value={jobDetails.skills}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="jobAbout">
                <FormLabel>About the Job</FormLabel>
                <Textarea
                  name="jobAbout"
                  value={jobDetails.jobAbout}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="submissionMethod">
                <FormLabel>Submission method</FormLabel>
                <Textarea
                  name="submissionMethod"
                  value={jobDetails.submissionMethod}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="responsibilites">
                <FormLabel>Responsibilities</FormLabel>
                <Textarea
                  name="responsibilites"
                  value={jobDetails.responsibilites}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="Salary">
                <FormLabel>Salary</FormLabel>
                <Textarea
                  name="Salary"
                  value={jobDetails.salary}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="qualifications">
                <FormLabel>Qualifications</FormLabel>
                <Textarea
                  name="qualifications"
                  value={jobDetails.qualifications}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Company Email</FormLabel>
                <Textarea
                  name="email"
                  value={jobDetails.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="experience">
                <FormLabel>Expierience</FormLabel>
                <Textarea
                  name="experience"
                  value={jobDetails.experience}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="other">
                <FormLabel>Other</FormLabel>
                <Textarea
                  name="other"
                  value={jobDetails.other}
                  onChange={handleChange}
                />
              </FormControl>

              <Button colorScheme="teal" onClick={handleUpdate}>
                Update Job Details
              </Button>
            </VStack>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default UpdatePostedJobs;
