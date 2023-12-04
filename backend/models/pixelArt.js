import mongoose from "mongoose";

const postInfo = mongoose.Schema(
    {
        // Removed 'user' field; we will use 'user_id' to reference the User model.
        user: {
            type: String,
            require: true,
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId, // Changed type to ObjectId
            ref: 'User', // Added a ref to 'User', indicating the model to use for population
            require: true,
        },
        likes: {
            type: Number,
            default: 0, // Changed to have a default value of 0
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)
export const Post = mongoose.model('Post', postInfo);