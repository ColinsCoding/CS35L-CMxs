import mongoose from "mongoose";

const userInfo = mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectID,
            red: 'Post', //should match the name given to the Post model
        }],
    },
    {
        timestamps: true,
    }
)
export const User = mongoose.model('User', userInfo);