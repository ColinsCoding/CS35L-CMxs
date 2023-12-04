import express from 'express';
import { Post } from '../models/pixelArt.js';
import { User } from '../models/user.js';

const router = express.Router();

router.post('/posts', async (request, response) => {
    try {
        if (
            !request.body.user ||
            (!request.body.likes && request.body.likes !== 0) ||
            !request.body.image
        ) {
            return response.status(400).send({
                message: 'Must send all fields',
            });
        }
        const newPost = {
            user: request.body.user,
            likes: request.body.likes,
            image: request.body.image,
        };

        const post = await Post.create(newPost);

        return response.status(201).send(post)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Incrememnt user's total likes (likes and unlikes)
router.post('/like/:id/:user', async (request, response) => {
    try {
        const postId = request.params.id;
        const username = request.params.user; 
        var like_increment = 1

        // Check if the user has already liked the post
        const user_liking = await User.findOne({username: username});
        if (user_liking.liked_posts.includes(postId)) {
            like_increment = -1
        }

        // Find the post and increment the likes
        const post = await Post.findById(postId);
        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }
        post.likes += like_increment;
        await post.save();

        // Add the post to the user's likedPosts and increment totalLikes
        if (like_increment == 1){
            user_liking.liked_posts.push(postId);
        }
        else {
            user_liking.liked_posts.splice(user_liking.liked_posts.indexOf(postId), 1);
        }
        await user_liking.save();
    
        const post_user = await User.findOne({username: post.user})
        post_user.totalLikes += like_increment;
        await post_user.save();

        response.status(200).json({ message: 'Post liked successfully', post });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get all posts
router.get('/posts', async (request, response) => {
    try {
        const posts = await Post.find({});

        return response.status(200).json({
            count: posts.length,
            data: posts
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get one post 
router.get('/posts/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const post = await Post.findById(id);

        return response.status(200).json(post);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a post
router.put('/posts/:id', async (request, response) => {
    try {
        if (
            !request.body.user || !request.body.user_id ||
            (!request.body.likes && request.body.likes !== 0) ||
            !request.body.image
        ) {
            return response.status(400).send({
                message: 'Must send all fields',
            });
        }

        const { id } = request.params;

        const result = await Post.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Post not found' });
        }

        return response.status(200).send({ message: 'Post updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.delete('/posts/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Post.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Post not found' });
        }

        return response.status(200).send({ message: 'Post deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Obtain all posts by a user
router.get('/user/posts/:username', async (request, response) => {
    try {

        const { username } = request.params;

        const posts = await Post.find({user: username});
        return response.status(200).json(posts);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/user', async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.liked_posts ||
            (!request.body.totalLikes && request.body.totalLikes !== 0)
        ) {
            return response.status(400).send({
                message: 'Must send all fields',
            });
        }
        const newUser = {
            username: request.body.username,
            posts: request.body.liked_posts,
        };

        const user = await User.create(newUser);

        return response.status(201).send(user)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get all users
router.get('/user', async (request, response) => {
    try {
        const users = await User.find({});

        return response.status(200).json({
            count: users.length,
            data: users
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get one user 
router.get('/user/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const user = await User.findById(id);

        return response.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get one user (with username)
router.get('/username/:username', async (request, response) => {
    try {

        const { username } = request.params;

        const user = await User.findOne({username: username});

        return response.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a user
router.put('/user/:id', async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.liked_posts ||
            (!request.body.totalLikes && request.body.totalLikes !== 0)
        ) {
            return response.status(400).send({
                message: 'Must send all fields',
            });
        }

        const { id } = request.params;

        const result = await User.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).send({ message: 'User updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a user
router.delete('/user/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;