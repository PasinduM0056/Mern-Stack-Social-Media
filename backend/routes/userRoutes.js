import express from "express";
import {
	followUnFollowUser,
	getUserProfile,
	loginUser,
	logoutUser,
	signupUser,
	updateUser,
	getSuggestedUsers,
	freezeAccount,
	submitBusinessProfile,
	submitConsultantProfile,
	checkIsBusiness,
	checkIsConsultant,
	submitOrganizationProfile,
	checkIsOrganization

} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser); // Toggle state(follow/unfollow)
router.put("/update/:id", protectRoute, updateUser);
router.put("/freeze", protectRoute, freezeAccount);
router.put("/business-profile/:id", protectRoute, submitBusinessProfile);
router.put("/consultant-profile/:id", protectRoute, submitConsultantProfile);
router.get("/check-business", protectRoute, checkIsBusiness); 
router.get("/check-consultant", protectRoute, checkIsConsultant); 
router.put("/organization-profile", protectRoute, submitOrganizationProfile);
router.get("/check-organization", protectRoute, checkIsOrganization); 

export default router;
