import express from "express";
import {
	createCAdd,
	deleteCAdd,
	getCAdd,
	likeUnlikeCAdd,
	replyToCAdd,
	getFeedCAdds,
	getUserCAdds,
} from "../controllers/cAddController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedCAdds);
router.get("/:id", getCAdd);
router.get("/user/:username", getUserCAdds);
router.post("/create", protectRoute, createCAdd);
router.delete("/:id", protectRoute, deleteCAdd);
router.put("/like/:id", protectRoute, likeUnlikeCAdd);
router.put("/reply/:id", protectRoute, replyToCAdd);

export default router;
