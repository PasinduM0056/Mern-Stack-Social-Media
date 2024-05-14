import React, { useState } from "react";
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
import userAtom from "../../atoms/userAtom";
import { useRecoilState } from "recoil";
import "./postajob.css";
import { useNavigate } from 'react-router-dom';
function PostaJob() {
  const [formData, setFormData] = useState({
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
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Posted-Jobs'); // Navigate to the "Posted Jobs" page
  };

  const onSubmit = async () => {
    try {
      await axios.post("/api/jobpost/Post-a-job", formData);
      setFormData({
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
    } catch (error) {
      console.error("Error adding job post:", error);
    }
  };

  return (
    <Grid container xs={12}>
      <Grid item xs={0}>
        <div
          className="job-post-up-container"
          style={{
            minWidth: "230vh",
            height: "40vh",
            marginLeft: "-40vh",
          }}
        >
          <div class="job-post-tooltip-container">
            <span class="job-post-tooltip-1">
              Provide accurate information
            </span>
            <span class="job-post-tooltip-2">Find the right candidates.</span>
            <span class="job-post-tooltip-3">Participate in challenges.</span>
            <span>Post a Job</span>
          </div>

          <h1
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",

              marginTop: "5vh",
              fontWeight: "700",
            }}
          >
            When crafting a job post, employees should aim for clarity and
            appeal, capturing both skills needed and company culture's feel.
            Accuracy and inclusivity pave the path,
            <br /> ensuring the right candidates find their way to our staff.
          </h1>
        </div>
      </Grid>

      <div class="post-a-job-container noselect">
        <div class="post-a-job-canvas">
          <div class="post-a-job-tracker post-a-job-tr-1"></div>
          <div class="post-a-job-tracker post-a-job-tr-2"></div>
          <div class="post-a-job-tracker post-a-job-tr-3"></div>
          <div class="post-a-job-tracker post-a-job-tr-4"></div>
          <div class="post-a-job-tracker post-a-job-tr-5"></div>
          <div class="post-a-job-tracker post-a-job-tr-6"></div>
          <div class="post-a-job-tracker post-a-job-tr-7"></div>
          <div class="post-a-job-tracker post-a-job-tr-8"></div>
          <div class="post-a-job-tracker post-a-job-tr-9"></div>
          <div class="post-a-job-tracker post-a-job-tr-10"></div>
          <div class="post-a-job-tracker post-a-job-tr-11"></div>
          <div class="post-a-job-tracker post-a-job-tr-12"></div>
          <div class="post-a-job-tracker post-a-job-tr-13"></div>
          <div class="post-a-job-tracker post-a-job-tr-14"></div>
          <div class="post-a-job-tracker post-a-job-tr-15"></div>
          <div class="post-a-job-tracker post-a-job-tr-16"></div>
          <div class="post-a-job-tracker post-a-job-tr-17"></div>
          <div class="post-a-job-tracker post-a-job-tr-18"></div>
          <div class="post-a-job-tracker post-a-job-tr-19"></div>
          <div class="post-a-job-tracker post-a-job-tr-20"></div>
          <div class="post-a-job-tracker post-a-job-tr-21"></div>
          <div class="post-a-job-tracker post-a-job-tr-22"></div>
          <div class="post-a-job-tracker post-a-job-tr-23"></div>
          <div class="post-a-job-tracker post-a-job-tr-24"></div>
          <div class="post-a-job-tracker post-a-job-tr-25"></div>
          <div id="post-a-job-card">
            <p id="post-a-job-prompt">
              Hover this card for check the details before post a job
            </p>
            <div className="post-a-job-instructions">
              <div className="post-a-job-title">
                <ul>
                  <li>
                    <strong>Define the Job Role:</strong> Clearly outline the
                    job responsibilities, required skills, and qualifications.
                  </li>
                  <li>
                    <strong>Include Essential Details:</strong> Specify job
                    title, location, work hours, and salary range (if
                    applicable).
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> Ensure your job posting
                    adheres to employment laws and regulations, including
                    anti-discrimination rules.
                  </li>
                  <li>
                    <strong>Consider Diversity and Inclusion:</strong> Use
                    inclusive language and encourage applicants from diverse
                    backgrounds.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <div className="post-a-job-full-form">
        <div className="Post-a-job-form-container">
          <form
            className="Post-a-job-form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="Post-a-job-form-group">
              <FormControl id="submissionmethod">
                <FormControl id="jobTitle">
                  <FormLabel>Job title</FormLabel>
                  <Input
                    placeholder="Enter job title"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                  />
                </FormControl>

                <FormControl id="salary">
                  <FormLabel>Salary</FormLabel>
                  <Input
                    placeholder="Enter salary"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                  />
                </FormControl>

                <FormControl id="email">
                  <FormLabel>Company Email</FormLabel>
                  <Input
                    placeholder="Email that candidate should send their cv"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                  />
                </FormControl>

                <FormControl id="experience">
                  <FormLabel>Experience level</FormLabel>
                  <Input
                    placeholder="Enter experience level"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    _placeholder={{ color: "gray.500" }}
                    type="text"
                  />
                </FormControl>

                <FormLabel>Form submission method</FormLabel>
                <Input
                  placeholder="Email, Phone"
                  value={formData.submissionMethod}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      submissionMethod: e.target.value,
                    })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="Application deadline">
                <FormLabel>Application deadline</FormLabel>
                <Input
                  placeholder="Application deadline"
                  value={formData.applicationDeadline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      applicationDeadline: e.target.value,
                    })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="skills">
                <FormLabel>Required skills</FormLabel>
                <Input
                  placeholder="Required skills"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="jobTitle">
                <FormLabel>Job about</FormLabel>
                <Input
                  placeholder="Job about"
                  value={formData.jobAbout}
                  onChange={(e) =>
                    setFormData({ ...formData, jobAbout: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="responsibilities">
                <FormLabel>Job responsibilities</FormLabel>
                <Input
                  placeholder="Job responsibilities"
                  value={formData.responsibilites}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      responsibilites: e.target.value,
                    })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl id="Qualifications">
                <FormLabel>Qualifications</FormLabel>
                <Input
                  placeholder="Qualifications"
                  value={formData.qualifications}
                  onChange={(e) =>
                    setFormData({ ...formData, qualifications: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>

              <FormControl id="other">
                <FormLabel>Other requirements</FormLabel>
                <Textarea
                  placeholder="Enter other requirements"
                  value={formData.other}
                  onChange={(e) =>
                    setFormData({ ...formData, other: e.target.value })
                  }
                  _placeholder={{ color: "gray.500" }}
                />
              </FormControl>
            </div>
            <Button type="submit" colorScheme="blue" size="lg">
              Submit
            </Button>
          </form>
        </div>
      </div>
     
      <div class="post-a-job-light-button">
        
        <button class="post-a-job-bt" onClick={handleClick}>
        
          <div class="post-a-job-light-holder">
            <div class="post-a-job-dot">
           
            </div>
            <div class="post-a-job-light"></div>
          </div>
          <div class="post-a-job-button-holder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
            >
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
            </svg>
            <p>View Posted jobs</p>
          </div>
   
        </button>
      </div>
    </Grid>
  );
}

export default PostaJob;
