import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostsPage from './PostsPage';
import Navbar from './Navbar';
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
      <Navbar />
      <br></br>
        <h1 className='text-3xl text-center'>Information about {user}</h1>
        <h3 className='text-2xl text-center'>Likes accumulated: <b>{"likes"}</b></h3>
        <h3 className='text-2xl text-center'>Removals accumulated: <b>{"removals"}</b></h3>
        <h3 className='text-2xl text-center'>Reputation: <b>{"rep"}</b></h3>
        <br></br> <br></br>
        <h1 className='text-3xl text-center'>Posts by {user}</h1>
        <PostsPage posts={posts} />
    </div>
    )
}
export default UserPage;