
import mongoose from "mongoose";
import PostJobs from '../models/postajob.js';


// Controller function to handle saving details to the database
const saveJobDetails = async (req, res) => {
    try {
        // Extract job details from the request body
        const { submissionMethod, applicationDeadline, skills, jobAbout , responsibilites, qualifications , jobTitle, salary, email, experience, other } = req.body;

        // Create a new document using the PostJobs model
        const newJob = new PostJobs({
            submissionMethod,
            applicationDeadline,
            skills,
            jobAbout,
            responsibilites,
            qualifications,
            jobTitle,
            salary,
            email,
            experience,
            other
        });

        // Save the new document to the database
        await newJob.save();

        // Respond with success message
        res.status(201).json({ success: true, message: 'Job details saved successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error saving job details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// Controller function to handle fetching all created jobs
const getAllJobs = async (req, res) => {
    try {
        // Query the database to find all job documents
        const jobs = await PostJobs.find();

        // Respond with the array of job documents
        res.status(200).json({ success: true, jobs });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching job details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// Controller function to handle fetching a job by its ID
const getJobById = async (req, res) => {
    try {
        // Extract the job ID from the request parameters
        const id = req.params.id;

        // Query the database to find the job document by its ID
        const job = await PostJobs.findById(id);

        // Check if the job exists
        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        // Respond with the job document
        res.status(200).json({ success: true, job });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching job by ID:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Controller function to update job details in the database
const updateJobDetails = async (req, res) => {
    try {
        // Extract job ID from the request parameters
        const { id } = req.params;

        // Extract updated job details from the request body
        const {
            submissionMethod,
            applicationDeadline,
            skills,
            jobAbout,
            responsibilites,
            qualifications,
            jobTitle,
            salary,
            email,
            experience,
            other,
        } = req.body;

        // Find and update the existing job document
        const updatedJob = await PostJobs.findByIdAndUpdate(
            id,
            {
                submissionMethod,
                applicationDeadline,
                skills,
                jobAbout,
                responsibilites,
                qualifications,
                jobTitle,
                salary,
                email,
                experience,
                other,
            },
            { new: true, runValidators: true } // Return the updated document and apply schema validation
        );

        // If no job document is found, return a 404 error
        if (!updatedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        // Respond with the updated job details
        res.status(200).json({ success: true, message: 'Job details updated successfully', job: updatedJob });
    } catch (error) {
        // Handle any errors that occur during the update process
        console.error('Error updating job details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


  // Function to delete a job by ID
  const deleteJob = async (req, res) => {
    try {
      const id = req.params.id; // Get the job ID from the request parameter
  
      const job = await PostJobs.findByIdAndDelete(id);
  
      if (!job) {
        return res.status(404).json({ success: false, message: "job not found" });
      }
  
      return res.status(200).json({ success: true, message: "job deleted successfully" });
    } catch (error) {
      console.error("Error deleting job:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  


export { saveJobDetails, getAllJobs, getJobById, updateJobDetails, deleteJob};
