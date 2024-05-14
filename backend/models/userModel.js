import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		
		petName: {
			type: String,
			required: true,
			unique: true,
		},
		petCategory: {
			type: String,
			required: true,
			unique: true,
		},
		ownerName: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			minLength: 6,
			required: true,
		},
		profilePic: {
			type: String,
			default: "",
		},
		followers: {
			type: [String],
			default: [],
		},
		following: {
			type: [String],
			default: [],
		},
		bio: {
			type: String,
			default: "",
		},
		isFrozen: {
			type: Boolean,
			default: false,
		},

		isBusiness: {
			type: Boolean,
			default: false,
		},
		name: {
			type: String,
			default: "",
		},
		address: {
			type: String,
			default: "",
		},
		idNumber: {
			type: String,
			default: "",
		},
		companyName: {
			type: String,
			default: "",
		},
		companyAbout: {
			type: String,
			default: "",
		},

		isConsultant: {
			type: Boolean,
			default: false,
		},
		qualification: {
			type: String,
			default: "",
		},
		experienses:{
			type: String,
			default: "",
		},
		isOrganization: {
			type: Boolean,
			default: false,
		},
		OrganizationName: {
			type: String,
			default: "",
		},
		OrganizationAbout: {
			type: String,
			default: "",
		},
		identityVerify: {
			type: String,
			default: "",
		},
		
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
