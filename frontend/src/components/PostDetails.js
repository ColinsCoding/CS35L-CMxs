import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const PostDetails = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`http://localhost:5555/posts/${id}`)
            .then((response) => {
                if (!response){
                    throw new Error("Post id does not exist!");
                }
                setPost(response.data);
              }).catch((error) => {
                alert("Post does not exist!")
                navigate("/feed")
              });
    }, [])
  return (
    <div>
        <Navbar />
        <div>
            <br></br>
            <h1 className='text-3xl text-center'>Post Details</h1>
            <br></br>
            {/* <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'> */}
                {/* <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>User: </span>
                    <span>{post.user}</span>
                </div>
                <div className='my-4'>
                    <img src={post.image}></img>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>Likes</span>
                    <span>{post.likes}</span>
                </div>
                <div className='my-4'>
                    <span className='text-x1 mr-4 text-gray-500'>Date</span>
                    <span>{new Date(post.updatedAt).toString()}</span>
                </div> */}
                <div className='flex justify-center items-center'>
                <img className= "border-2 border-gray-700" src={post.image}></img>
                </div>
                <br></br>
                <h3 className='text-2xl text-center'>User: <b>{post.user}</b></h3>
                <h3 className='text-2xl text-center'>Likes: <b>{post.likes}</b></h3>
                <h3 className='text-2xl text-center'>Date: <b>{new Date(post.updatedAt).toString()}</b></h3>
            {/* </div> */}
        </div>
    </div>
  )
}

export default PostDetails