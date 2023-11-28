import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostsPage from './PostsPage';

const MainPage = () => {
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
        <h1 className='text-2xl'>Main Page</h1>
        <PostsPage posts={posts} />
    </div>
    )
}
export default MainPage;