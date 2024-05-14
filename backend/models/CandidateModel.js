import mongoose from "mongoose";

const candidateSchema = mongoose.Schema(
    {
        CandidateName: {//dd
            type: String,
            default: "",
        },
        CandidateNo: {//dd
            type: String,
            default: "",
        },
        CandidateEmail: {//dd
            type: String,
            default: "",
        },
        messagetoManager: {
            type: String,
            default: "",
        },
        job: {
            applicationDeadline: {//dd
                type: String,
                default: "",
            },
            jobAbout: {//dd
                type: String,
                default: "",
            },
            responsibilites: {//dd
                type: String,
                default: "",
            },
            jobTitle: {//dd
                type: String,
                default: "",
            },
            email: {//dd
                type: String,
                default: "",
            },
           
        }
    }
);

const Candidate = mongoose.model("Candidates", candidateSchema);

export default Candidate;
