import React from 'react'
import { useAppContext } from '../context/AppContext'
import { LayoutGrid, List, MessageSquareHeart } from "lucide-react"

const Navbar = () => {
    const {state, actions} = useAppContext()
    const isGrid = state.viewMode === "grid";

   return (
    <header className='sticky top-0 z-40 bg-gray-800/90 backdrop-blur border-b border-gray-700'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
            <div className='flex items-center gap-3 text-white'>
                LOGO
            </div>
            <div className='flex items-center gap-3'>
                <button 
                    onClick={actions.toggleView}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-400 text-white'
                >
                    {isGrid ? (
                        <>
                         <List size={16} />
                         <span className='hidden sm:inline'>List View</span>
                        </>
                    ) : (
                        <>
                            <LayoutGrid size={16} />
                            <span className='hidden sm:inline'>Grid View</span>
                        </>
                    )}
                </button>

                <button 
                    onClick={actions.toggleFeedback}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-400 text-white'
                >
                    <MessageSquareHeart size={16} />
                    <span>We are listening</span>
                </button>
            </div>
        </div>
    </header>
  )
}

export default Navbar
