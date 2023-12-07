import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BiPencil } from "react-icons/bi";
import { FaRegHeart, FaHeart, FaTrash } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const SinglePost = ({ post, likedPosts}) => {
    const { user } = useAuthContext();
    const [likes, setLikes] = useState(post.likes);
    const navigate = useNavigate();
    const [postInLikes, setPostInLikes] = useState(likedPosts.includes(post._id));
    
    const handleEdit = () => {
      if (!user) {
          alert("You must be logged in to edit a post.");
          navigate('/login');
          return;
      }
      navigate(`/edit/${post._id}`);
    }
    const handleLike = () => {
      if (!user) {
        alert('Please login to like a post');
        navigate('/login');
        return;
      }
      axios
      .post(`http://localhost:5555/like/${post._id}/${user.username}`) // replace with username
      .then(() => {
        if (!postInLikes){
          setLikes(likes+1);
        }
        else {
          setLikes(likes-1)
        }
      })
      .catch((error) => {
        alert('Could not edit like on post!')
        console.log(error);
      });
      setPostInLikes(!postInLikes);
    };
    const handleDelete = async () => {
      if (!user) {
        alert("You must be logged in to access this feature");
        navigate('/login');
        return;
      }
      if(post.user != user.username) {
        alert('You may only delete your own posts!');
        return;
      }
      axios
      .delete(`http://localhost:5555/posts/${post._id}`)
      .then((response) => {
        console.log('Post deleted successfully');
        //Reload page
        window.location.reload(false);
      })  
      .catch ((error) => {
        console.error('Error deleting post:', error.message);
      });
    };
    return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <div className='flex justify-between'>
      <h4 className='my-2 text-gray-500 text-left'>{post.user}</h4>
      <h4 className='my-2 text-red-700 text-right'>{likes}</h4>
      </div>
      <div className='flex justify-start items-center gap-x-2'>
        <img src={post.image}></img>
      </div>
      <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
      <Link to={`/post/${post._id}`}>
            <BsInfoCircle className='text-2xl text-blue-700 hover:text-black'/>
        </Link>
      <Link to={`/user/${post.user}`}>
            <FaRegUserCircle className='text-2xl text-green-800 hover:text-black'/>
        </Link>
        {postInLikes ? (
          <FaHeart className='text-2xl text-red-700 hover:text-black' onClick={handleLike}/>
        ):(
          <FaRegHeart className='text-2xl text-red-700 hover:text-black' onClick={handleLike}/>
        )}
          <BiPencil
            className='text-3xl text-yellow-300 hover:text-black' onClick={handleEdit}
          />
          {(window.location.pathname === `/user/${user.username}`) 
          && <FaTrash className='text-2xl text-gray-400 hover:text-black' onClick={handleDelete}
          />}
      </div>
      {/* <h4 className='my-2 text-gray-500 text-left'>{new Date(post.updatedAt).toString()}</h4> */}
    </div>
  );
}

export default SinglePost