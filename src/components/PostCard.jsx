import React from 'react'
import { useAppContext } from '../context/AppContext'
import { X } from 'lucide-react'

const GridCard = ({post,index, onRemove}) =>{
    const userId = String(post.userId).padStart(2,"0")

    return(
        <article className='relative group bg-gray-800 border border-gray-700 rounded-3xl p-6 flex flex-col gap-4'>
            <button onClick={()=>onRemove(post.id)} className='absolute top-4 right-4 w-7 h-7 rounded-full bg-red-500 border border-red-500 flex items-center justify-center text-red-400'>
                <X size={13} strokeWidth={2.5} />
            </button>

            <h3 className='text-gray-100 font-semibold text-base leading-snug capitalize'>{post.title}</h3>

            <p className='text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1'>{post.body}</p>
            <div className='pt-4 border-t border-gray-700 flex items-center justify-between'>
                <span className='text-xs text-gray-500'>Post</span>
            </div>
        </article>
    )
}
const ListCard = ({post, index, onRemove}) =>{
    const userId = String(post.userId).padStart(2,"0")
 return (
    <article className='relative group bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 flex items-start gap-5'>
        <div className='shrink-0 w-10 h-10 rounded-lg bg-red-500 border border-red-500 flex items-center justify-center text-red-400 text-sm font-bold'>{post.id}</div>
        <div className='flex-1 min-w-0'>
           <h3 className='text-gray-100 font-semibold text-sm leading-snug capitalize line-clamp-1 mb-1'>{post.title}</h3>
           <p className='text-gray-400 text-xm leading-relaxed line-clamp-2'>{post.body}</p>
        </div>
        <button onClick={()=> onRemove(post.id)} className='shrink-0 w-7 h-7 rounded-full bg-red-500 border border-red-500 flex items-center justify-center text-red-400'>
            <X size={13} strokeWidth={2.5} />
        </button>
    </article>
 )
}

const PostCard = ({post, index}) => {
    const {state,actions} = useAppContext()
    if(state.viewMode === "list"){
        return <ListCard post={post} index={index} onRemove={actions.removePost} />
    }
  return (
    <GridCard post={post} index={index} onRemove={actions.removePost}/>
  )
}

export default PostCard
