import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";


const getUserProfile = async (req, res) => {
	// We will fetch user profile either with username or userId
	// query is either username or userId
	const { query } = req.params;

	try {
		let user;

		// query is userId
		if (mongoose.Types.ObjectId.isValid(query)) {
			user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");
		} else {
			// query is username
			user = await User.findOne({ username: query }).select("-password").select("-updatedAt");
		}

		if (!user) return res.status(404).json({ error: "User not found" });

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in getUserProfile: ", err.message);
	}
};

const signupUser = async (req, res) => {
	try {
		const { email, username, password } = req.body;
		const user = await User.findOne({ $or: [{ email }, { username }] });

		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			username,
			password: hashedPassword,
		});
		await newUser.save();

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);

			res.status(201).json({
				_id: newUser._id,
				email: newUser.email,
				username: newUser.username,
				bio: newUser.bio,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

		if (user.isFrozen) {
			user.isFrozen = false;
			await user.save();
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			email: user.email,
			username: user.username,
			bio: user.bio,
			profilePic: user.profilePic,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log("Error in loginUser: ", error.message);
	}
};

const logoutUser = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({ message: "User logged out successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

const followUnFollowUser = async (req, res) => {
	try {
		const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString())
			return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			res.status(200).json({ message: "User followed successfully" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in followUnFollowUser: ", err.message);
	}
};

const updateUser = async (req, res) => {
	const { email, username, password, bio} = req.body;
	const { name, address, companyName, companyAbout, idNumber} = req.body;
	const { qualification, experienses, OrganizationName,OrganizationAddress, OrganizationAbout, IDnumber} = req.body;

	let { profilePic } = req.body;

	const userId = req.user._id;
	try {
		let user = await User.findById(userId);
		if (!user) return res.status(400).json({ error: "User not found" });

		if (req.params.id !== userId.toString())
			return res.status(400).json({ error: "You cannot update other user's profile" });

		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			user.password = hashedPassword;
		}

		if (profilePic) {
			if (user.profilePic) {
				await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(profilePic);
			profilePic = uploadedResponse.secure_url;
		}

		user.email = email || user.email;
		user.username = username || user.username;
		user.profilePic = profilePic || user.profilePic;
		user.bio = bio || user.bio;

		user.name = name || user.name;
        user.address = address || user.address;
        user.idNumber = idNumber || user.idNumber;
        user.companyName = companyName || user.companyName;
        user.companyAbout = companyAbout || user.companyAbout;

		user.qualification = qualification || user.qualification;
		user.experienses = experienses || user.experienses;

		user.OrganizationName = OrganizationName || user.OrganizationName;
		user.OrganizationAddress = OrganizationAddress || user.OrganizationAddress;
		user.OrganizationAbout = OrganizationAbout || user.OrganizationAbout;
		user.IDnumber = IDnumber || user.IDnumber;

		user = await user.save();

		// Find all posts that this user replied and update username and userProfilePic fields
		await Post.updateMany(
			{ "replies.userId": userId },
			{
				$set: {
					"replies.$[reply].username": user.username,
					"replies.$[reply].userProfilePic": user.profilePic,
				},
			},
			{ arrayFilters: [{ "reply.userId": userId }] }
		);

		// password should be null in response
		user.password = null;

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in updateUser: ", err.message);
	}
};

const getSuggestedUsers = async (req, res) => {
	try {
		// exclude the current user from suggested users array and exclude users that current user is already following
		const userId = req.user._id;

		const usersFollowedByYou = await User.findById(userId).select("following");

		const users = await User.aggregate([
			{
				$match: {
					_id: { $ne: userId },
				},
			},
			{
				$sample: { size: 10 },
			},
		]);
		const filteredUsers = users.filter((user) => !usersFollowedByYou.following.includes(user._id));
		const suggestedUsers = filteredUsers.slice(0, 4);

		suggestedUsers.forEach((user) => (user.password = null));

		res.status(200).json(suggestedUsers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const freezeAccount = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		user.isFrozen = true;
		await user.save();

		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

  
const submitBusinessProfile = async (req, res) => {
    const { name, address, idNumber, companyName, companyAbout, password } = req.body;
    let { identityVerify } = req.body;
    const userId = req.user._id;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (req.params.id !== userId.toString()) {
            return res.status(403).json({ error: "You cannot update other user's profile" });
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        if (identityVerify) {
            // Upload identity verification image to Cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(identityVerify);
            identityVerify = uploadedResponse.secure_url;

            // Delete previous image from Cloudinary
            if (user.identityVerify) {
                await cloudinary.uploader.destroy(user.identityVerify.split("/").pop().split(".")[0]);
            }
        }

        // Update user fields
        user.name = name || user.name;
        user.address = address || user.address;
        user.idNumber = idNumber || user.idNumber;
        user.companyName = companyName || user.companyName;
        user.companyAbout = companyAbout || user.companyAbout;
        user.identityVerify = identityVerify || user.identityVerify;

        // Set isBusiness to true
        user.isBusiness = true;

        // Save updated user to database
        user = await user.save();

        // Omit password from response
        user.password = null;

        res.status(200).json(user);
    } catch (err) {
        console.error("Error in submitBusinessProfile:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};


const submitConsultantProfile = async (req, res) => {
    const { name, address, idNumber, qulification, experienses, password } = req.body;
    let { identityVerify } = req.body;
    const userId = req.user._id;

    try {
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (req.params.id !== userId.toString()) {
            return res.status(403).json({ error: "You cannot update other user's profile" });
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        if (identityVerify) {
            // Upload identity verification image to Cloudinary
            const uploadedResponse = await cloudinary.uploader.upload(identityVerify);
            identityVerify = uploadedResponse.secure_url;

            // Delete previous image from Cloudinary
            if (user.identityVerify) {
                await cloudinary.uploader.destroy(user.identityVerify.split("/").pop().split(".")[0]);
            }
        }

        // Update user fields
        user.name = name || user.name;
        user.address = address || user.address;
        user.idNumber = idNumber || user.idNumber;
        user.qulification = qulification || user.qulification;
        user.experienses = experienses || user.experienses;
        user.identityVerify = identityVerify || user.identityVerify;


		 // Set isBusiness to true
		 user.isConsultant = true;
        // Save updated user to database
        user = await user.save();

        // Omit password from response
        user.password = null;

        res.status(200).json(user);
    } catch (err) {
        console.error("Error in submitConsultantProfile:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

  
  

const checkIsBusiness = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		res.status(200).json({ isBusiness: user.isBusiness });
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log("Error in checkIsBusiness: ", error.message);
	}
};

const checkIsConsultant = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(400).json({ error: "User not found" });
		}

		res.status(200).json({ isConsultant: user.isConsultant });
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log("Error in checkIsConsultant: ", error.message);
	}
};

const checkIsOrganization = async (req, res) => {
	try {
	  const useId = req.user._id;
	  const users = await User.findById(useId);
  
	  if (!users) {
		return res.status(400).json({ error: "User not found" });
	  }
  
	  res.status(200).json({ isOrganization: users.isOrganization });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	  console.log("Error in checkIsOrganization: ", error.message);
	}
  };




  const submitOrganizationProfile = async (req, res) => {
	const { OrganizationName, OrganizationAddress, OrganizationAbout, IDnumber } = req.body;
	const userId = req.user._id;
	try {
	  let user = await User.findById(userId);
	  if (!user) return res.status(400).json({ error: "User not found" });
  
	  // Update user with business profile data
	  user.OrganizationName = OrganizationName;
	  user.OrganizationAddress = OrganizationAddress;
	  user.OrganizationAbout = OrganizationAbout;
	  user.IDnumber = IDnumber;
  
	  user.isOrganization = true;
	  // Save the updated user
	  user = await user.save();
  
	  // Respond with the updated user
	  res.status(200).json(user);
	} catch (err) {
	  res.status(500).json({ error: err.message });
	  console.log("Error in submit organization profile: ", err.message);
	}
  };

export {
	signupUser,
	loginUser,
	logoutUser,
	followUnFollowUser,
	updateUser,
	getUserProfile,
	getSuggestedUsers,
	freezeAccount,
	submitBusinessProfile,
	submitConsultantProfile,
	checkIsBusiness,
	checkIsConsultant,
	checkIsOrganization,
	submitOrganizationProfile
};
