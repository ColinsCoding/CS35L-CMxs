import React, { useEffect } from 'react'
import SinglePost from "./SinglePost"
import axios from 'axios'
import { useState } from 'react'

const PostsPage = ({ posts }) => {
    const [likedPosts, setLikedPosts] = useState([]);
    // Get info of logged in user
    useEffect(() => {
        axios.get(`http://localhost:5555/username/Marco`) // replace with username
        .then((response) => {
          setLikedPosts(response.data.liked_posts);
        }).catch((error) => {
          alert("Could not get user data")
          console.log(error)
        });
      }, []);

    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {posts.map((item) => (
                <SinglePost key={item._id} post={item} likedPosts={likedPosts}/>
            ))}
        </div>
    )
}

export default PostsPage