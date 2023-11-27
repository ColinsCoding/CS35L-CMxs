import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        <h1>Main Page</h1>
        <tbody>
        {posts.map((post, index) => (
          <tr key={post._id} className='h-8'>
            {/* <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td> */}
            <td className='border border-slate-700 rounded-md text-center'>
              {post.user}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {post.likes}
            </td>
            <img src={post.image}></img>
          </tr>
        ))}
      </tbody>
    </div>
    )
}
export default MainPage;