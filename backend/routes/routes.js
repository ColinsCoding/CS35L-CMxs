import express from 'express';
import { Post } from '../models/pixelArt.js';

const router = express.Router();

router.post('/posts', async (request, response) => {
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
        const newPost = {
            user: request.body.user,
            user_id: request.body.user_id,
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

export default router;