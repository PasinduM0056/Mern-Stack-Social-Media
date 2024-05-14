import express from "express";
import {
	createAdd,
	deleteAdd,
	getAdd,
	likeUnlikeAdd,
	replyToAdd,
	getFeedAdds,
	getUserAdds,
} from "../controllers/addController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedAdds);
router.get("/:id", getAdd);
router.get("/user/:username", getUserAdds);
router.post("/create", protectRoute, createAdd);
router.delete("/:id", protectRoute, deleteAdd);
router.put("/like/:id", protectRoute, likeUnlikeAdd);
router.put("/reply/:id", protectRoute, replyToAdd);

export default router;