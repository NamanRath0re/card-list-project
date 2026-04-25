import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { X } from 'lucide-react'

const FeedbackModal = () => {

    const {state, actions} = useAppContext()
    console.log('actions',state);

    const [form,setForm] = useState({
        name : "",
        email: "", 
    })
    const [submitted,setSubmitted] = useState(false)

    if(!state.isFeedbackOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault()

        const emailRegex = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

        if(!form.name || !form.email){
            alert("fill all fields")
            return
        }
        // if(!emailRegex.test(form.email)){
        //     alert("Invalid email")
        //     return
        // }
        setSubmitted(true)

        setTimeout(()=>{
            setForm({name:"",email:""});
            setSubmitted(false)
            actions.closeFeedback();
        },1500)
    }
    
  return (
    <div className='fixed inset-0 bg-black/70 flex justify-center items-center' onClick={()=>{actions.isFeedbackOpen}}>
      <div className='bg-gray-800 p-6 rounded-xl w-96'>
        <div className='flex items-center justify-between mb-4'>
                <h2 className='text-gray-100 text-lg font-semibold'>We are listening</h2>
                <p className='text-gray-500 text-xm mt-0.5'>Thank you so much for taking the Time!</p>
            <button onClick={actions.closeFeedback} className='w-8 h-8 rounded-lg border border-gray-600 flex items-center justify-center text-gray-400 '>
                <X size={15} />
            </button>
        </div>
        {
            submitted ? (
                <p className='text-green-400 text-center'>Feedback Submitted</p>
            ) : (
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        type='text'
                        placeholder='Name'
                        value={form.name}
                        onChange={(e)=>
                            setForm({...form,name:e.target.value})
                        }
                        className='w-full p-3 rounded bg-gray-900 text-white'
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        value={form.email}
                        onChange={(e)=>
                            setForm({...form,email:e.target.value})
                        }
                        className='w-full p-3 rounded bg-gray-900 text-white'
                    />
                    <button className='w-full bg-red-500 p-3 rounded text-white'>Submit</button>
                </form>
            )
        }
      </div>
    </div>
  )
}

export default FeedbackModal
