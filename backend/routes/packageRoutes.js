import express from "express";
import {
	createPackage,
	deletePackage,
	getPackage,
	likeUnlikePackage,
	reviewPackage,
	getFeedPackages,
	getUserPackages,
	buyPackage
} from "../controllers/packageController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPackages);
router.get("/:id", getPackage);
router.get("/user/:username", getUserPackages);
router.post("/create", protectRoute, createPackage);
router.delete("/:id", protectRoute, deletePackage);
router.put("/like/:id", protectRoute, likeUnlikePackage);
router.put("/review/:id", protectRoute, reviewPackage);
router.put("/buy/:id", protectRoute, buyPackage)

export default router;