import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BiShow } from 'react-icons/bi';
import { FaRegHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";


const SinglePost = ({ post }) => {
    return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <h4 className='my-2 text-gray-500'>{post.user}</h4>
      <div className='flex justify-start items-center gap-x-2'>
        <img src={post.image}></img>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
        <BiShow
          className='text-3xl text-blue-800 hover:text-black cursor-pointer'
        />
        <Link to={`/user/${post.user}`}>
            <FaRegUserCircle className='text-2xl text-green-800 hover:text-black'/>
        </Link>
        {/* <Link to={`/user/${post.user}`}> */}
          <FaRegHeart className='text-2xl text-black hover:red-600' />
        {/* </Link> */}
      </div>
    </div>
  );
}

export default SinglePost