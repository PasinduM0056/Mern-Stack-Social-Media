import Package from "../models/packageModel.js"
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const createPackage = async (req, res) => {
	try {
		const { postedBy, packageName, packageDescription, packagePrice, packageOfferPrice} = req.body;
		let { packageImg } = req.body;

		if (!postedBy || !packageName) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		if (packageImg) {
			const uploadedResponse = await cloudinary.uploader.upload(packageImg);
			packageImg = uploadedResponse.secure_url;
		}


		const newPackage = new Package({ postedBy, packageName, packageDescription, packagePrice, packageOfferPrice, packageImg});
		await newPackage.save();

		res.status(201).json(newPackage);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};

const getPackage = async (req, res) => {
	try {
		const selectedPackage = await Package.findById(req.params.id);

		if (!selectedPackage) {
			return res.status(404).json({ error: "Product not found" });
		}

		res.status(200).json(selectedPackage);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deletePackage = async (req, res) => {
	try {
		const selectedPackage = await Package.findById(req.params.id);
		if (!selectedPackage) {
			return res.status(404).json({ error: "Package not found" });
		}

		if (selectedPackage.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete post" });
		}

		if (selectedPackage.packageImg) {
			const packageImgId = post.packageImg.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(packageImgId);
		}

		await Package.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const likeUnlikePackage = async (req, res) => {
	try {
		const { id: packageId } = req.params;
		const userId = req.user._id;

		const selectedPackage = await Package.findById(packageId);

		if (!selectedPackage) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLikedPackage = selectedPackage.likes.includes(userId);

		if (userLikedPackage) {
			// Unlike post
			await Package.updateOne({ _id: packageId }, { $pull: { likes: userId } });
			res.status(200).json({ message: "Post unliked successfully" });
		} else {
			// Like post
			selectedPackage.likes.push(userId);
			await selectedPackage.save();
			res.status(200).json({ message: "Package liked successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const reviewPackage = async (req, res) => {
	try {
		const { text,rating } = req.body;
		const packageId = req.params.id;
		const userId = req.user._id;
		const userProfilePic = req.user.profilePic;
		const username = req.user.username;
        

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}

		const selectedPackage = await Package.findById(packageId);
		if (!selectedPackage) {
			return res.status(404).json({ error: "Post not found" });
		}

		const review = { userId, text, userProfilePic, username, rating };

		selectedPackage.reviews.push(review);
		await selectedPackage.save();

		res.status(200).json(review);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getFeedPackages = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const following = user.following;

		const feedPackages = await Package.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedPackages);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserPackages = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const packages = await Package.find({ postedBy: user._id }).sort({ createdAt: -1 });

		res.status(200).json(packages);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const buyPackage = async (req, res) => {
    try {
        const packageId = req.params.id;
        const { buyerName, buyerAddress, buyerPhoneNumber } = req.body;
        const userId = req.user._id;

        // Check if required fields are provided
        if (!buyerName || !buyerAddress || !buyerPhoneNumber) {
            return res.status(400).json({ error: "Buyer information is incomplete" });
        }

        // Find the package
        const selectedPackage = await Package.findById(packageId);
        if (!selectedPackage) {
            return res.status(404).json({ error: "Package not found" });
        }

        // Create buyer object
        const buyer = {
            userId,
            buyerName,
            buyerAddress,
            buyerPhoneNumber
        };

        // Add buyer to the package's buyers array
        selectedPackage.buyers.push(buyer);

        // Save the updated package
        await selectedPackage.save();

        res.status(200).json({ message: "Package bought successfully", selectedPackage });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSalesPackages = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);

		if (!user) {

			return res.status(404).json({ error: "User not found" });

		}

		const following = user.following;

		const salesPackages = await Package.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(salesPackages);
	} catch (err) {

		res.status(500).json({ error: err.message });

	}
};

export { createPackage, getPackage, deletePackage, likeUnlikePackage, reviewPackage, getFeedPackages, getUserPackages,buyPackage, getSalesPackages };