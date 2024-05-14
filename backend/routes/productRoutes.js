import express from "express";
import {
	createProduct,
	deleteProduct,
	getProduct,
	likeUnlikeProduct,
	reviewProduct,
	getFeedProducts,
	getUserProducts,
	buyProduct
} from "../controllers/productController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedProducts);
router.get("/:id", getProduct);
router.get("/user/:username", getUserProducts);
router.post("/create", protectRoute, createProduct);
router.delete("/:id", protectRoute, deleteProduct);
router.put("/like/:id", protectRoute, likeUnlikeProduct);
router.put("/review/:id", protectRoute, reviewProduct);
router.put("/buy/:id", protectRoute, buyProduct)

export default router;