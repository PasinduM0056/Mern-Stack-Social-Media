import mongoose from "mongoose";

const postaJobSchema = mongoose.Schema({
    submissionMethod: {
        type: String,
        default: "",
    }, 
    applicationDeadline: {
        type: String,
        default: "",
    },
    skills: {
        type: String,
        default: "",
    },
    jobAbout: {
        type: String,
        default: "",
    },
    responsibilites: {
        type: String,
        default: "",
    },
    qualifications: {
        type: String,
        default: "",
    },
    jobTitle: {
        type: String,
        default: "",
    },
    salary: {
        type: Number,
        default: 0, // Default value changed to 0
    },
    email: {
        type: String,
        default: "",
    },
    experience: {
        type: String,
        default: "",
    },
    other: {
        type: String,
        default: "",
    },
});

const PostJobs = mongoose.model("PJob", postaJobSchema);

export default PostJobs;
