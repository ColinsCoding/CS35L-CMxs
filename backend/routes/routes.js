// backend/routes/routes.js

import express from 'express';
import { Post } from '../models/pixelArt.js';
import { User } from '../models/user.js';
import bcrypt from 'bcryptjs'; // Import bcrypt
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config();

const router = express.Router();

export const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET_TOKEN, {expiresIn: '3d'})
}


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
            !request.body.user ||
            (!request.body.likes && request.body.likes !== 0) ||
            !request.body.image
        ) {
            return response.status(400).send({
                message: 'Must send all fields',
            });
        }

        const { id } = request.params;

        const post = await Post.findById(id);

        const old_user = await User.findOne({username: post.user});
        old_user.totalRemovals += 1;
        await old_user.save();

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
            !request.body.liked_posts
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
            (!request.body.totalLikes && request.body.totalLikes !== 0) ||
            (!request.body.totalRemovals && request.body.totalRemovals !== 0)
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

// Authentication routes from Project 2's `auth.js` file
// Integrate these routes with Project 2's controllers
router.post('/users/register', async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({ message: 'Email already exists' });
        } else {
          return res.status(400).json({ message: 'Username already exists' });
        }
      }
  
      // Create new user
      const newUser = new User({
        username,
        email,
        password
      });
  
      // Hash password before saving to database
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
  
      await newUser.save();

      //token
      const token = createToken(newUser._id);
      res.json({email, username, token}); // Respond with the newly created user message
      // res.json({ message: 'Sign up successful' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.post('/users/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const username = user.username;
        // Successful login
        const token = createToken(user._id);
        res.json({email, username, token}); 
        // res.json({ message: 'Login successful' });
      } else {
        return res.status(400).json({ message: 'Invalid password' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  export default router;