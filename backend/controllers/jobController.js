import Job from "../models/jobModel.js"
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const createJob = async (req, res) => {
	try {
		const { postedBy, jobName, jobDescription, jobPrice, jobOfferPrice} = req.body;
		let { jobImg } = req.body;

		if (!postedBy || !jobName) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		if (jobImg) {
			const uploadedResponse = await cloudinary.uploader.upload(jobImg);
			jobImg = uploadedResponse.secure_url;
		}


		const newJob = new Package({ postedBy, jobName, jobDescription, jobPrice, jobOfferPrice, jobImg});
		await newJob.save();

		res.status(201).json(newJob);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};

const getJobs = async (req, res) => {
	try {
		const selectedJob = await Package.findById(req.params.id);

		if (!selectedJob) {
			return res.status(404).json({ error: "Product not found" });
		}

		res.status(200).json(selectedJob);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteJob = async (req, res) => {
	try {
		const selectedJob = await Job.findById(req.params.id);
		if (!selectedJob) {
			return res.status(404).json({ error: "Job not found" });
		}

		if (selectedJob.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete post" });
		}

		if (selectedJob.jobImg) {
			const JobImgId = post.JobImg.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(JobImgId);
		}

		await Job.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const likeUnlikeJob = async (req, res) => {
	try {
		const { id: jobId } = req.params;
		const userId = req.user._id;

		const selectedJob = await Job.findById(jobId);

		if (!selectedJob) {
			return res.status(404).json({ error: "Post not found" });
		}

		const userLikedJob = selectedJob.likes.includes(userId);

		if (userLikedJob) {
			// Unlike post
			await Job.updateOne({ _id: jobId }, { $pull: { likes: userId } });
			res.status(200).json({ message: "Post unliked successfully" });
		} else {
			// Like post
			selectedJob.likes.push(userId);
			await selectedJob.save();
			res.status(200).json({ message: "Package liked successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const reviewJob = async (req, res) => {
	try {
		const { text,rating } = req.body;
		const jobId = req.params.id;
		const userId = req.user._id;
		const userProfilePic = req.user.profilePic;
		const username = req.user.username;
        

		if (!text) {
			return res.status(400).json({ error: "Text field is required" });
		}

		const selectedJob = await Job.findById(jobId);
		if (!selectedJob) {
			return res.status(404).json({ error: "Post not found" });
		}

		const review = { userId, text, userProfilePic, username, rating };

		selectedJob.reviews.push(review);
		await selectedJob.save();

		res.status(200).json(review);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getFeedJobs = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const following = user.following;

		const feedJobs = await Job.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedJobs);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUserJobs = async (req, res) => {
	const { username } = req.params;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const jobs = await Job.find({ postedBy: user._id }).sort({ createdAt: -1 });

		res.status(200).json(jobs);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const buyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { buyerName, buyerAddress, buyerPhoneNumber } = req.body;
        const userId = req.user._id;

        // Check if required fields are provided
        if (!buyerName || !buyerAddress || !buyerPhoneNumber) {
            return res.status(400).json({ error: "Buyer information is incomplete" });
        }

        // Find the package
        const selectedJob = await Job.findById(jobId);
        if (!selectedJob) {
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
        selectedJob.buyers.push(buyer);

        // Save the updated package
        await selectedJob.save();

        res.status(200).json({ message: "Package bought successfully", selectedJob });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSalesJobs = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);

		if (!user) {

			return res.status(404).json({ error: "User not found" });

		}

		const following = user.following;

		const salesJobs = await Job.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(salesJobs);
	} catch (err) {

		res.status(500).json({ error: err.message });

	}
};

export { createJob, getJobs, deleteJob, likeUnlikeJob, reviewJob, getFeedJobs, getUserJobs,buyJob, getSalesJobs };