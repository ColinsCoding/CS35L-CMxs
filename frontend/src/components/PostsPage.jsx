import React, { useEffect } from 'react'
import SinglePost from "./SinglePost"
import axios from 'axios'
import { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";

const PostsPage = ({ posts }) => {
    var user_data = JSON.parse(localStorage.getItem("user"));
    var username = "";
    const [likedPosts, setLikedPosts] = useState([]);
    // Get info of logged in user
    useEffect(() => {
      if (user_data != null) {
        username = user_data["username"]
        axios.get(`http://localhost:5555/username/${username}`)
        .then((response) => {
          setLikedPosts(response.data.liked_posts);
        }).catch((error) => {
          alert("Error")
          console.log(error)
        });
      }
      }, [user_data]);

    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {posts.map((item) => (
                <SinglePost key={item._id} post={item} likedPosts={likedPosts}/>
            ))}
        </div>
    )
}

export default PostsPage