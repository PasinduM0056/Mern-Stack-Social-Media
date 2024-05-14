import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Textarea,
  Heading,
  Alert,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import HeaderB from "../../components/HeaderB";
import "./jobApplication.css";

function JobApplicationForm() {
  const [formData, setFormData] = useState({
    job: {
      jobTitle: "",
      email: "",
      applicationDeadline: "",
      responsibilities: "",
      jobAbout: ""
    },
    CandidateName: "",
    CandidateNo: "",
    CandidateEmail: "",
    messagetoManager: ""
  });
  
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [jobData, setJobData] = useState(null); // Define jobData state

  
  useEffect(() => {
    const fetchJobById = async () => {
      try {
        console.log("Fetching job with ID:", id);
        const response = await axios.get(`/api/jobpost/Get-jobs-by-id/${id}`);
        const jobData = response.data;
        console.log("Fetched job data:", jobData);
        setFormData(jobData);
        setJobData(jobData); // Set jobData state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job:", error);
        setLoading(false);
      }
    };
  
    fetchJobById();
  }, [id]);

  const onSubmit = async () => {
    try {
      console.log("testtttt",formData);
      await axios.post("/api/candidates/candidate-apply", formData);
      // Here, you can directly use jobData state
      setFormData(prevState => ({
        ...prevState,
        job: {
          ...prevState.job,
          jobTitle: jobData.jobTitle,
          email: jobData.email,
          applicationDeadline: jobData.applicationDeadline,
          responsibilities: jobData.responsibilities,
          jobAbout: jobData.jobAbout
        }
      }));
    } catch (error) {
      console.error("Error applying:", error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container xs={12}>
      <Header />
      <HeaderB />

      <div className="job-application-full-form">
        <div className="job-application-form-container">
          <form
            className="job-application-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData.job);

            }}
          >
            <FormControl id="jobTitle">
              <FormLabel>Job title</FormLabel>
              <Input
                value={formData.job && formData.job.jobTitle}
                readOnly
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    job: { ...formData.job, jobTitle: e.target.value },
                  })
                }
              />

            </FormControl>

            <FormControl id="CandidateName">
              <FormLabel>Enter your name</FormLabel>
              <Input
                placeholder="Enter your name"
                value={formData.CandidateName}
                onChange={(e) =>
                  setFormData({ ...formData, CandidateName: e.target.value })
                }
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>

            <FormControl id="CandidateNo">
              <FormLabel>Your contact number</FormLabel>
              <Input
                placeholder="Enter your contact number"
                value={formData.CandidateNo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CandidateNo: e.target.value,
                  })
                }
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>

            <FormControl id="CandidateEmail">
              <FormLabel>Your email</FormLabel>
              <Input
                placeholder="Enter your email"
                value={formData.CandidateEmail}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CandidateEmail: e.target.value,
                  })
                }
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>

            <FormControl id="jobTitle">
              <FormLabel>Company Email</FormLabel>
              <Input 
              value={formData.job.email} 
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              readOnly />
            </FormControl>

            <FormControl id="jobTitle">
              <FormLabel>Application Deadline</FormLabel>
              <Input value={formData.job.applicationDeadline} 
              readOnly
              onChange={(e) =>
                setFormData({ ...formData, job: { ...formData.job, applicationDeadline: e.target.value } })
              } />
            </FormControl>

            <FormControl id="salary">
              <FormLabel>Responsibilities for candidate</FormLabel>
              <Input 
              value={formData.job.responsibilites} 
              readOnly
              onChange={(e) =>
                setFormData({ ...formData, job: { ...formData.job, responsibilites: e.target.value } })
              } />
            </FormControl>

            <FormControl id="salary">
              <FormLabel>About</FormLabel>
              <Input 
              value={formData.job.jobAbout} 
              readOnly
              onChange={(e) =>
                setFormData({ ...formData, job: { ...formData.job, jobAbout: e.target.value } })
              }
               />
            </FormControl>

            <FormControl id="messagetoManager">
              <FormLabel>Message to manager</FormLabel>
              <Textarea
                placeholder="Enter your message to manager"
                value={formData.messagetoManager}
                onChange={(e) =>
                  setFormData({ ...formData, messagetoManager: e.target.value })
                }
                _placeholder={{ color: "gray.500" }}
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" size="lg">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Grid>
  );
}

export default JobApplicationForm;
