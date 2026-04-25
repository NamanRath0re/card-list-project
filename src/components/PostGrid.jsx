import React from 'react'
import { useAppContext } from '../context/AppContext'
import PostCard from './PostCard';

const PostGrid = () => {

    const {state, visiblePosts} = useAppContext()
    const isGrid = state.viewMode === "grid";

    if(visiblePosts.length === 0){
        return(
            <div className=' fle flex-col items-center justify-center text-gray-500'>No posts</div>
        )
    }
  return (
    <div key={`${state.currentPage}-${state.viewMode}`} className={
        isGrid? "grid grid-cols-3 gap-5" : "flex flex-col gap-3"
    }>
      { visiblePosts.map((post,index)=>(
        <PostCard id={post.id} post={post} index={index} />
      ))}
    </div>
  )
}

export default PostGrid
