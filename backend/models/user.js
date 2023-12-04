import mongoose from "mongoose";

const userInfo = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        liked_posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post', //should match the name given to the Post model
        }],
        totalLikes: {
            type: Number,
            default: 0, // Default to 0 and will increment with each like on user's posts
        },
    },
    {
        timestamps: true,
    }
)
export const User = mongoose.model('User', userInfo);