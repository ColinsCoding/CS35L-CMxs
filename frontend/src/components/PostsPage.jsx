import React from 'react'
import SinglePost from "./SinglePost"

const PostsPage = ({ posts }) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {posts.map((item) => (
                <SinglePost key={item._id} post={item} />
            ))}
        </div>
    )
}

export default PostsPage