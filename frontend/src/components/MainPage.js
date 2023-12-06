import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostsPage from './PostsPage';
import Navbar from './Navbar';
function MainPage () {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
          .get('http://localhost:5555/posts')
          .then((response) => {
            setPosts(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    return (
    <div>
        <Navbar />
        <br></br>
        <h1 className='text-3xl text-center'>All Posts</h1>
        <br></br>
        <PostsPage posts={posts} />
    </div>
    )
}
export default MainPage;