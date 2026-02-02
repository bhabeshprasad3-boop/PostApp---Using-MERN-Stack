import React, { useState , useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


const Feed = () => {

  
  const [posts, setPosts] = useState([]);

 
 const getPost = async() =>{
    try{

        const response = await axios.get("http://localhost:3000/posts")
        setPosts(response.data.posts)

    }catch(error){
        console.error("Error fetching posts:",error)
    }
 }

 useEffect(()=>{
    getPost()
 },[])


  return (
    
    <div className='w-full min-h-screen bg-zinc-100 flex flex-col items-center py-10'>

        
        <h1 className='text-3xl font-bold mb-8 text-zinc-800'>Feed</h1>

        <div className='w-full max-w-md px-4'>
            {posts.map((post, idx) => {
                return (
                    // Card Container
                    <div key={idx} className='bg-white rounded-lg overflow-hidden shadow-lg mb-6 border border-zinc-200'>
                        
                        {/* Image Section */}
                        <div className='w-full h-64 bg-gray-200'>
                            <img 
                                className='w-full h-full object-cover' 
                                src={post.image} 
                                alt="post-img" 
                            />
                        </div>

                        {/* Caption Section */}
                        <div className='p-4'>
                            <h3 className='font-bold text-sm mb-1'>User_Name</h3>
                            <p className='text-gray-600 text-sm'>
                                {post.caption}
                            </p>
                        </div>

                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Feed