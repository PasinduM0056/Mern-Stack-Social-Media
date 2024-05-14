import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import "./candidatesShortlisting.css";

function Shortlistedcandidates() {
  const [candidates, setCandidates] = useState([]); // State to store candidate data

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("/api/candidates/all-selected-candidates");
        console.log("Response data:", response.data); // Log the data to examine its structure
        setCandidates(response.data); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  // Function to handle accepting a candidate
  const handleAccept = async (candidate) => {
    try {
      const response = await axios.post("/api/candidates/Shortlisted-candidates", candidate);
      console.log("Candidate accepted:", response.data); // Log success message
      // You can choose to remove the candidate from the list or refresh the list after acceptance
       setCandidates(candidates.filter((c) => c._id !== candidate._id));
    } catch (error) {
      console.error("Error accepting candidate:", error);
    }
  };

  // Function to handle rejecting a candidate
  const handleReject = async (candidate) => {
    try {
      await axios.delete(`/api/candidates/Done-selected-candidates/${candidate._id}`); // DELETE request to backend
      setCandidates(candidates.filter((c) => c._id !== candidate._id)); // Remove from state
    } catch (error) {
      console.error("Error rejecting candidate:", error);
    }
  };

  return (
    <div>
      {/* Top container */}
      <div
        className="Create-a-post-up-container"
        style={{
          minWidth: "230vh",
          height: "40vh",
          marginLeft: "-40vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="Create-a-post-tooltip-container">
          <span className="Create-a-post-tooltip-1">
            Provide accurate information.
          </span>
          <span className="Create-a-post-tooltip-2">
            Make a Rich Text Editing.
          </span>
          <span className="Create-a-post-tooltip-3">
            Participate in challenges.
          </span>
          <span>Candidates shortlisting</span>
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
          When shortlisting candidates, employers need to be thorough and
          mindful of various factors to ensure they
          <br />
          select the best candidates while maintaining fairness, legal
          compliance, and alignment with company goals.
        </h1>
      </div>

      <div class="candidates-card">
        <div class="candidates-main-content">
          <div class="candidates-header">
            <span></span>
            <span
              style={{
                fontFamily:
                  " 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
                fontWeight: "600",
                fontSize: "17px",
              }}
            >
              Read below points before shortlisting candidates
            </span>
          </div>

          <p class="candidates-heading">
            <List spacing={3} style={{ fontSize: "15px" }}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Job Requirements and Qualifications
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Soft Skills and Cultural Fit
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Past Performance and Achievements
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Problem-Solving and Critical Thinking
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Compliance with Employment Laws and Regulations
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                Interviews and Assessments
              </ListItem>
            </List>
          </p>
        </div>
        <div class="candidates-footer">by SoulLift community</div>
      </div>

      {/* Candidate Information */}
      <List spacing={3} style={{ padding: "20px" }}>
        {candidates.map((candidate) => (
          <div
            className="shortlisting-card"
            style={{ width: "80vh", marginTop: "-50vh",marginBottom:'60vh' }}
            key={candidate._id}
         
          >
            <div className="shortlisting-card-border" />
            <div className="shortlisting-card-title-container">
              <span className="shortlisting-card-title">
                <strong style={{ marginLeft: "260px", fontWeight: "100", fontSize: "16px" }}>
                  Application Deadline:
                </strong>{" "}
                {candidate.job.applicationDeadline}
              </span>
              <p className="shortlisting-card-paragraph">
                <strong style={{ fontSize: "20px" }}>Job Title:</strong>{" "}
                {candidate.job.jobTitle}
              </p>
            </div>

            <hr className="shortlisting-line" />

            <ListItem className="candidate-item">
              <div className="candidate-details">
                <strong>Candidate Name:</strong> {candidate.CandidateName}
                <br />
                <strong>Candidate Email:</strong> {candidate.CandidateEmail}
                <br />
                <strong>Candidate Number:</strong> {candidate.CandidateNo}
                <br />
                <strong>Job About:</strong> {candidate.job.jobAbout}
                <br />
                <strong>Message to Manager:</strong> {candidate.messagetoManager}
                <br />
                <strong>Job Responsibilities:</strong> {candidate.job.responsibilities}
                <br />
                <strong>Job Email:</strong> {candidate.job.email}
              </div>
            </ListItem>

            
            <button
              className="shortlisting-button"
              onClick={() => handleReject(candidate)}
            >Done</button>
          </div>
        ))}
      </List>
    </div>
  );
}

export default Shortlistedcandidates;

