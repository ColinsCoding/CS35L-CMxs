import mongoose from "mongoose";

const userInfo = mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
        },
        posts: {
            type: Array,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)
export const User = mongoose.model('User', userInfo);