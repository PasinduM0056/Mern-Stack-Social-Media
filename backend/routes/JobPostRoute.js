import express from 'express';
import {saveJobDetails , getAllJobs, getJobById, updateJobDetails,deleteJob} from '../controllers/postaJobController.js';
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/Post-a-job", protectRoute, saveJobDetails);
router.get("/Get-all-jobs", protectRoute, getAllJobs);
router.get("/Get-jobs-by-id/:id", protectRoute, getJobById);
router.put("/update-posted-jobs/:id", protectRoute, updateJobDetails);
router.delete("/delete-posted-jobs/:id", protectRoute, deleteJob);
export default router;

