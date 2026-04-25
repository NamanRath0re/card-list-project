import React from 'react'
import { useAppContext } from '../context/AppContext'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = () => {
    const {state, actions } = useAppContext()
    const {currentPage, totalPages} = state;

    if (totalPages <= 1 ) return null

    const getPageNumbers = () =>{
        const pages = [];
        const delta = 1;
        const left = Math.max(2,currentPage - delta);
        const right = Math.min(totalPages - 1, currentPage+delta)

        pages.push(1)
        if(left>2)  pages.push("...");
        for( let i= left; i<=right; i++) pages.push(i);
        if(right < totalPages-1) pages.push("...")
        if(totalPages > 1 ) pages.push(totalPages)

            return pages 
    }
  return (
    <div className='flex items-center justify-center gap-2 mt-10 flex-wrap'>
      <button
        disabled={currentPage === 1 }
        onClick={()=> actions.setPage(currentPage -1)}
     className='flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-400 text-sm'
      >
        <ChevronLeft size={15} />
        <span>Prev</span>
      </button>
      { getPageNumbers().map((page,idx) =>
        page === "..." ? (
            <span className='px-2 text-gray-500 text-sm'>...</span>
        ): (
            <button
              key={page}
              onClick={()=> actions.setPage(page)}
              className={`w-9 h-9 rounded-lg border text-sm font-medium ${ 
                page === currentPage ? "bg-red-500 border-red-500 text-white shadow-lg"
                : "border-gray-600 bg-gray-800 text-gray-400"
              }`}
            >{page}</button>
        )
    )}
    <button 
    disabled={currentPage === totalPages }
        onClick={()=> actions.setPage(currentPage + 1)}
        className='flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-400 text-sm'
    >
        <span>next</span>
        <ChevronRight size={15} />
    </button>
    </div>
  )
}

export default Pagination
