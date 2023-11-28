import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostsPage from './PostsPage';

const UserPage = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useParams();
    useEffect(() => {
        axios
          .get(`http://localhost:5555/user/posts/${user}`)
          .then((response) => {
            setPosts(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    
    return (
    <div>
        <h1 className='text-2xl'>Posts by {user}</h1>
        <PostsPage posts={posts} />
    </div>
    )
}
export default UserPage;