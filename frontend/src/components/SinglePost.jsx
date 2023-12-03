import { Link } from 'react-router-dom';
import { BiPencil } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";



const SinglePost = ({ post }) => {
    return (
    <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'>
      <div className='flex justify-between'>
      <h4 className='my-2 text-gray-500 text-left'>{post.user}</h4>
      <h4 className='my-2 text-red-700 text-right'>{post.likes}</h4>
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
        {/* <Link to= Like_Post`}> */}
        <FaRegHeart className='text-2xl text-red-700 hover:text-black' />
        {/* </Link> */}
        <Link to={`/edit/${post._id}`}>
          <BiPencil
            className='text-3xl text-yellow-300 hover:text-black'
          />
        </Link>
      </div>
      {/* <h4 className='my-2 text-gray-500 text-left'>{new Date(post.updatedAt).toString()}</h4> */}
    </div>
  );
}

export default SinglePost