import mongoose from "mongoose";

const postInfo = mongoose.Schema(
    {
        user: {
            type: String,
            require: true,
        },
        likes: {
            type: Number,
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