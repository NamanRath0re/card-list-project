import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AppProvider, useAppContext } from './context/AppContext'
import Navbar from './components/Navbar'
import PostGrid from './components/PostGrid'
import Pagination from './components/Pagination'
import FeedbackModal from './components/FeedbackModal'
import { Loader } from 'lucide-react'
import LoadingSceen from './components/LoadingSceen'

const PageContent = () => {

  const {state, activePosts} = useAppContext()

  if (state.isLoading) return <LoadingSceen />

  return (
   <>
   <Navbar />
   <main className='max-w-7xl mx-auto px-6 py-8'>
    <div className='mb-8'>
      <h1 className='text-3xl font-bold text-gray-100 mb-1'> PostBoard</h1>
      <p>showing <span>{activePosts.length}</span>
       - Page<span>{state.currentPage}</span>
      {""}of <span>{state.totalPages}</span>
      </p> 
    </div>
    <PostGrid />
    <Pagination /> 
   </main>
   <FeedbackModal />
   </>
  )
}

export default function App(){
  return(
    <AppProvider>
      <PageContent/>
    </AppProvider>
  )
}
