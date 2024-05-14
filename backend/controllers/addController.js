import Add from "../models/addModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const createAdd = async (req, res) => {
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

		const newAdd = new Add({ postedBy, text, img });
		await newAdd.save();

		res.status(201).json(newAdd);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};

const getAdd = async (req, res) => {
	try {
		const add = await Add.findById(req.params.id);

		if (!add) {
			return res.status(404).json({ error: "Add not found" });
		}

		res.status(200).json(add);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteAdd = async (req, res) => {
	try {
		const add = await Add.findById(req.params.id);
		if (!add) {
			return res.status(404).json({ error: "Add not found" });
		}

		if (add.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete add" });
		}


		if (add.img) {
			const imgId = add.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

		await Add.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Add deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const likeUnlikeAdd = async (req, res) => {
	try {
		const { id: addId } = req.params;
		const userId = req.user._id;
        

		const add = await Add.findById(addId);

		if (!add) {
			return res.status(404).json({ error: "add not found" });
		}

		const userLikedAdd = add.likes.includes(userId);

		if (userLikedAdd) {
			// Unlike post
			await Add.updateOne({ _id: addId }, { $pull: { likes: userId } });
			res.status(200).json({ message: "Post unliked successfully" });
		} else {
			// Like post
			add.likes.push(userId);
			await add.save();
			res.status(200).json({ message: "Add liked successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const replyToAdd = async (req, res) => {
	try {
		const { text } = req.body;
		const addId = req.params.id;
		const userId = req.user._id;
		const userProfilePic = req.user.profilePic;
		const username = req.user.username;

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}

		const add = await Add.findById(addId);
		if (!add) {
			return res.status(404).json({ error: "Add not found" });
		}

		const reply = { userId, text, userProfilePic, username };

		add.replies.push(reply);
		await add.save();

		res.status(200).json(reply);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getFeedAdds = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
        
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}


		const following = user.following;

		const feedAdds = await Add.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedAdds);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserAdds = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const adds = await Add.find({ postedBy: user._id }).sort({ createdAt: -1 });

		res.status(200).json(adds);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export { createAdd, getAdd, deleteAdd, likeUnlikeAdd, replyToAdd, getFeedAdds, getUserAdds };