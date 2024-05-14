import Product from "../models/productModel.js"
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const createProduct = async (req, res) => {
	try {
		const { postedBy, productName, productDescription, productPrice, productOfferPrice} = req.body;
		let { productImg } = req.body;

		if (!postedBy || !productName) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		if (productImg) {
			const uploadedResponse = await cloudinary.uploader.upload(productImg);
			productImg = uploadedResponse.secure_url;
		}


		const newProduct = new Product({ postedBy, productName, productDescription, productPrice, productOfferPrice, productImg});
		await newProduct.save();

		res.status(201).json(newProduct);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};

const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		res.status(200).json(product);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		if (product.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete post" });
		}

		if (product.productImg) {
			const productImgId = product.productImg.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(productImgId);
		}

		await Product.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const likeUnlikeProduct = async (req, res) => {
	try {
		const { id: productId } = req.params;
		const userId = req.user._id;

		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLikedProduct = product.likes.includes(userId);

		if (userLikedProduct) {
			// Unlike post
			await Product.updateOne({ _id: productId }, { $pull: { likes: userId } });
			res.status(200).json({ message: "Post unliked successfully" });
		} else {
			// Like post
			product.likes.push(userId);
			await product.save();
			res.status(200).json({ message: "Product liked successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const reviewProduct = async (req, res) => {
	try {
		const { text,rating } = req.body;
		const productId = req.params.id;
		const userId = req.user._id;
		const userProfilePic = req.user.profilePic;
		const username = req.user.username;
        

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}

		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({ error: "Post not found" });
		}

		const review = { userId, text, userProfilePic, username, rating };

		product.reviews.push(review);
		await product.save();

		res.status(200).json(review);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getFeedProducts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const following = user.following;

		const feedProducts = await Product.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedProducts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserProducts = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const products = await Product.find({ postedBy: user._id }).sort({ createdAt: -1 });

		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const buyProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { buyerName, buyerAddress, buyerPhoneNumber } = req.body;
        const userId = req.user._id;

        // Check if required fields are provided
        if (!buyerName || !buyerAddress || !buyerPhoneNumber) {
            return res.status(400).json({ error: "Buyer information is incomplete" });
        }

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Create buyer object
        const buyer = {
            userId,
            buyerName,
            buyerAddress,
            buyerPhoneNumber
        };

        // Add buyer to the product's buyers array
        product.buyers.push(buyer);

        // Save the updated product
        await product.save();

        res.status(200).json({ message: "Product bought successfully", product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSalesProducts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);

		if (!user) {

			return res.status(404).json({ error: "User not found" });

		}

		const following = user.following;

		const salesProducts = await Product.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(salesProducts);
	} catch (err) {

		res.status(500).json({ error: err.message });

	}
};

export { createProduct, getProduct, deleteProduct, likeUnlikeProduct, reviewProduct, getFeedProducts, getUserProducts,buyProduct, getSalesProducts };