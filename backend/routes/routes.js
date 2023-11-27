import express from 'express';
import { Post } from '../models/pixelArt.js';
import { User } from '../models/user.js';

const router = express.Router();

router.post('/', async (request, response) => {
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
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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
router.put('/:id', async (request, response) => {
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

router.delete('/:id', async (request, response) => {
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


router.post('/user', async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.posts
        ) {
            return response.status(400).send({
                message: 'Must send all fields',
            });
        }
        const newUser = {
            username: request.body.username,
            posts: request.body.posts,
        };

        const user = await User.create(newUser);

        return response.status(201).send(user)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Get all posts
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

// Get one post 
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

// Update a post
router.put('/user/:id', async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.posts
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