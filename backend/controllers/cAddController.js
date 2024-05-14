import CAdd from "../models/caddModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const createCAdd = async (req, res) => {
	try {
		const { postedBy, text } = req.body;
		let { img } = req.body;

		if (!postedBy || !text ) {
			return res.status(400).json({ error: "Postedby,addOf and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		const newCAdd = new CAdd({ postedBy, text, img });
		await newCAdd.save();

		res.status(201).json(newCAdd);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};

const getCAdd = async (req, res) => {
	try {
		const cadd = await CAdd.findById(req.params.id);

		if (!cadd) {
			return res.status(404).json({ error: "Add not found" });
		}

		res.status(200).json(cadd);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteCAdd = async (req, res) => {
	try {
		const cadd = await CAdd.findById(req.params.id);
		if (!cadd) {
			return res.status(404).json({ error: "Add not found" });
		}

		if (cadd.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete add" });
		}


		if (cadd.img) {
			const imgId = cadd.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

		await CAdd.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Add deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const likeUnlikeCAdd = async (req, res) => {
	try {
		const { id: caddId } = req.params;
		const userId = req.user._id;
        

		const cadd = await CAdd.findById(caddId);

		if (!cadd) {
			return res.status(404).json({ error: "add not found" });
		}

		const userLikedCAdd = cadd.likes.includes(userId);

		if (userLikedCAdd) {
			// Unlike post
			await CAdd.updateOne({ _id: caddId }, { $pull: { likes: userId } });
			res.status(200).json({ message: "Post unliked successfully" });
		} else {
			// Like post
			cadd.likes.push(userId);
			await cadd.save();
			res.status(200).json({ message: "Add liked successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const replyToCAdd = async (req, res) => {
	try {
		const { text } = req.body;
		const caddId = req.params.id;
		const userId = req.user._id;
		const userProfilePic = req.user.profilePic;
		const username = req.user.username;

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}

		const cadd = await CAdd.findById(caddId);
		if (!cadd) {
			return res.status(404).json({ error: "Add not found" });
		}

		const reply = { userId, text, userProfilePic, username };

		cadd.replies.push(reply);
		await cadd.save();

		res.status(200).json(reply);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getFeedCAdds = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
        
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}


		const following = user.following;

		const feedCAdds = await CAdd.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedCAdds);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserCAdds = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const cadds = await CAdd.find({ postedBy: user._id }).sort({ createdAt: -1 });

		res.status(200).json(cadds);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export { createCAdd, getCAdd, deleteCAdd, likeUnlikeCAdd, replyToCAdd, getFeedCAdds, getUserCAdds };