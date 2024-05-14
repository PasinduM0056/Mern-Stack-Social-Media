import { Box, Heading, Text, VStack, Spinner, Button } from "@chakra-ui/react";
// Import Link from react-router-dom
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import SuggestedUsers from "../components/SuggestedUsers";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import "./Organization-job-page.css";
import { Link as RouterLink } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
const OrganizationPage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const showToast = useShowToast();
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/jobpost/Get-all-jobs"); // Change the endpoint accordingly
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobs();
  }, []);

  const handlyApply = (id) => {
    navigate(`/Job-application-form/${id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box p={4}>
        <Heading mb={1} sx={{ marginLeft: "10vh" }}>
          Top Jobs That Suits You
        </Heading>

        {loading ? (
          <Spinner />
        ) : (
          <VStack align="start" spacing={4}>
            {jobs.map((job) => (
              <div class="modal" style={{ marginTop: "10vh" }} key={job._id}>
                <article class="modal-container">
                  <header class="modal-container-header">
                    <span class="modal-container-title">
                      <svg
                        aria-hidden="true"
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M14 9V4H5v16h6.056c.328.417.724.785 1.18 1.085l1.39.915H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8v1h-7zm-2 2h9v5.949c0 .99-.501 1.916-1.336 2.465L16.5 21.498l-3.164-2.084A2.953 2.953 0 0 1 12 16.95V11zm2 5.949c0 .316.162.614.436.795l2.064 1.36 2.064-1.36a.954.954 0 0 0 .436-.795V13h-5v3.949z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      <Heading size="md">
                        {job.jobTitle}{" "}
                        <Text fontSize="sm">
                          <div
                            style={{
                              marginTop:'-3vh',
                              marginLeft:'266px',
                              fontWeight: "100",
                              fontSize: "16px",
                            }}
                          >
                            Application Deadline:   {job.applicationDeadline}
                          </div>
                        
                        </Text>
                      </Heading>
                    </span>
                  </header>
                  <section
                    class="modal-container-body rtf"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ol>
                      <Text fontSize="sm">
                        <div
                          style={{
                            
                            fontWeight: "800",
                            fontSize: "26px",
                          }}
                        >
                          Send you cv to below
                        </div>{" "}
                        {job.submissionMethod}
                      </Text>
                      <Text fontSize="sm">
                        <div
                          style={{
                            
                            fontWeight: "800",
                            fontSize: "26px",
                          }}
                        >
                          Company Email
                        </div>
                        {job.email}
                      </Text>
                      <Text fontSize="sm">
                        <div
                          style={{
                           
                            fontWeight: "800",
                            fontSize: "26px",
                          }}
                        >
                          Salary
                        </div>
                        {job.salary}
                      </Text>
                      <Text fontSize="sm">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "800",
                            fontSize: "26px",
                          }}
                        >
                          Experience
                        </div>
                        {job.experience}
                      </Text>

                      <Text fontSize="sm">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "800",
                            fontSize: "26px",
                          }}
                        >
                          Skills
                        </div>{" "}
                        {job.skills}
                      </Text>
                      <Text fontSize="sm">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "800",
                            fontSize: "26px",
                          }}
                        >
                          About the job
                        </div>{" "}
                        {job.jobAbout}
                      </Text>
                      <Text fontSize="sm">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "800",
                            fontSize: "26px",
                          }}
                        >
                          Responsibilities
                        </div>
                        {job.responsibilites}
                      </Text>
                      <Text fontSize="sm">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "800",
                            fontSize: "26px",
                          }}
                        >
                          Qualifications
                        </div>{" "}
                        {job.qualifications}
                      </Text>
                      <Text fontSize="sm">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "800",
                            fontSize: "26px",
                          }}
                        >
                          Other
                        </div>{" "}
                        {job.other}
                      </Text>
                    </ol>
                  </section>
                  <footer class="modal-container-footer">
                    <Button
                      variant="contained"
                      onClick={() => handlyApply(job._id)}
                    >
                      Apply
                    </Button>
                  </footer>
                </article>
              </div>
            ))}
          </VStack>
        )}
      </Box>
    </div>
  );
};

export default OrganizationPage;
