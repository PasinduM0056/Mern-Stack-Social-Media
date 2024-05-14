import Candidates from "../models/CandidateModel.js";
import AcceptedCandidate from "../models/AcceptedCandidate.js";

const addCandidate = async (req, res) => {
    try {
        // Extract candidate details from the request body
        const { CandidateName, CandidateNo, CandidateEmail,messagetoManager  , job  } = req.body;

        // Create a new candidate document using the Candidates model
        const newCandidate = new Candidates({
            CandidateName,
            CandidateNo,
            CandidateEmail,
            messagetoManager,
            job: {
                applicationDeadline: job.applicationDeadline,
                jobAbout: job.jobAbout,
                responsibilites: job.responsibilites,
                jobTitle: job.jobTitle,
                email: job.email
            }
        });

        // Save the new candidate document to the database
        await newCandidate.save();

        // Respond with success message
        return res.status(201).json({ success: true, message: 'Candidate details saved successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error saving candidate details:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// Function to retrieve all candidates from the database
const getAllCandidates = async (req, res) => {
    try {
      // Retrieve all candidates from the database
      const candidates = await Candidates.find();
      return res.status(200).json(candidates);
      // Respond with the retrieved candidates
      return res.status(200).json({ success: true, candidates });
    } catch (error) {
      // Handle errors that occur during the process
      console.error("Error retrieving candidates:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };


  // Function to retrieve all candidates from the database
const getAllSelected = async (req, res) => {
  try {
    // Retrieve all candidates from the database
    const candidates = await AcceptedCandidate.find();
    return res.status(200).json(candidates);
    // Respond with the retrieved candidates
    return res.status(200).json({ success: true, candidates });
  } catch (error) {
    // Handle errors that occur during the process
    console.error("Error retrieving candidates:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};




  const acceptCandidate = async (req, res) => {
    try {
      const candidateData = req.body; // Get the candidate data from the request body
  
      // Create a new accepted candidate in the database
      const acceptedCandidate = new AcceptedCandidate(candidateData);
  
      await acceptedCandidate.save(); // Save to the database
  
      res.status(201).json({
        message: "Candidate accepted successfully",
        data: acceptedCandidate,
      });
    } catch (error) {
      console.error("Error accepting candidate:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };



  // Function to delete a candidate by ID
const deleteCandidate = async (req, res) => {
  try {
    const candidateId = req.params.id; // Get the candidate ID from the request parameter

    const candidate = await Candidates.findByIdAndDelete(candidateId);

    if (!candidate) {
      return res.status(404).json({ success: false, message: "Candidate not found" });
    }

    return res.status(200).json({ success: true, message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


  // Function to delete a candidate by ID
  const DoneSelectedCandidates = async (req, res) => {
    try {
      const candidateId = req.params.id; // Get the candidate ID from the request parameter
  
      const candidate = await AcceptedCandidate.findByIdAndDelete(candidateId);
  
      if (!candidate) {
        return res.status(404).json({ success: false, message: "Candidate not found" });
      }
  
      return res.status(200).json({ success: true, message: "Selected candidate removed successfully" });
    } catch (error) {
      console.error("Error deleting candidate:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
export  {addCandidate, getAllCandidates, acceptCandidate, deleteCandidate, getAllSelected, DoneSelectedCandidates};
