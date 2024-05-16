import express from "express";
import {
	createJob,
	deleteJob,
	getJob,
	likeUnlikeJob,
	reviewJob,
	getFeedJobs,
	getUserJobs,
	buyJob
} from "../controllers/jobController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedJobs);
router.get("/:id", getJob);
router.get("/user/:username", getUserJobs);
router.post("/create", protectRoute, createJob);
router.delete("/:id", protectRoute, deleteJob);
router.put("/like/:id", protectRoute, likeUnlikeJob);
router.put("/review/:id", protectRoute, reviewJob);
router.put("/buy/:id", protectRoute, buyJob)

export default router;