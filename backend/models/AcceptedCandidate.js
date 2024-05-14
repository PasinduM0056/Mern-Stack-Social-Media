// models/AcceptedCandidate.js
import mongoose from "mongoose";

// Define the schema for an accepted candidate
const acceptedCandidateSchema = new mongoose.Schema({
  CandidateName: {
    type: String,
    required: true,
    default: "",
  },
  CandidateEmail: {
    type: String,
    required: true,
    default: "",
  },
  CandidateNo: {
    type: String,
    required: true,
    default: "",
  },
  messagetoManager: {
    type: String,
    default: "",
  },
  acceptedAt: {
    type: Date,
    default: Date.now,
  },
  job: {
    applicationDeadline: {
      type: String,
      default: "",
    },
    jobAbout: {
      type: String,
      default: "",
    },
    responsibilities: {
      type: String,
      default: "",
    },
    jobTitle: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
  },
 
});


// Export the model correctly
const AcceptedCandidate = mongoose.model("AcceptedCandidate", acceptedCandidateSchema);
export default  AcceptedCandidate; // Ensure this is the exported name
