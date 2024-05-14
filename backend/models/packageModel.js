import mongoose from "mongoose";

const packageSchema = mongoose.Schema(
	{
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		packageName: {
            type: String,
        },
        packageDescription: {
            type: String,
        },
        packagePrice: {
            type: String,
        },
        packageOfferPrice: {
            type: String,
        },
		packageImg: {
			type: String,
		},
		likes: {
			// array of user ids
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
		reviews: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				text: {
					type: String,
					required: true,
				},
				userProfilePic: {
					type: String,
				},
				username: {
					type: String,
				},
                rating: {
                    type: Number,
                }
			},
		],

        buyers: [
            {
                userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				buyerName: {
					type: String,
				},
                buyerAddress: {
                    type: String,
                },
                buyerPhoneNumber: {
                    type: String,
                }
            }
        ],

		advertisement: [
            {
            
				addText: {
					type: String,
				},
                addImage: {
                    type: String,
                },
                
            }
        ]
	},
	{
		timestamps: true,
	}
);

const Package = mongoose.model("Package", packageSchema);

export default Package;