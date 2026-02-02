import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
  
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) 

    const formData = new FormData(e.target)

    try {
      // Backend request
      const response = await axios.post("http://localhost:3000/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        
        }
       
        
      })

      // Success hone par
      alert("Post Created Successfully! 🎉")
      e.target.reset()
         navigate('/feed') 

    } catch (error) {
      console.error(error)
      alert("Error creating post. Check console.")
    } finally {
      setLoading(false) // Button wapas enable kar do
    }
  }

  return (
    <section className='max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-xl shadow-lg'>
        
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>
            Create New Post
        </h1>
        
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            
            {/* File Input */}
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-gray-700'>Upload Image</label>
                <input 
                    type="file" 
                    name='image' 
                    accept="image/*" 
                    required 
                    className='block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100 cursor-pointer'
                />
            </div>

            {/* Caption Input */}
            <div className='flex flex-col gap-2'>
                <label className='text-sm font-medium text-gray-700'>Caption</label>
                <input 
                    type="text" 
                    placeholder='Write a caption...' 
                    name='caption' 
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
                />
            </div>

            {/* Submit Button */}
            <button 
                type='submit' 
                disabled={loading} 
                className={`w-full text-white font-semibold py-2.5 rounded-lg shadow-md transition duration-300 
                  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {loading ? "Posting..." : "Post Now"}
            </button>
        </form>
    </section>
  )
}

export default CreatePost