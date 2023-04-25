import React from 'react'

const Sidebar = ({blogs, setCategory, category}) => {

const categories = [...new Set(blogs.map((blog) => blog.category ))]
  


  return (
    <div className=' overflow-y-auto hidden md:flex flex-col bg-slate-50    gap-3 px-10 border-r border-gray-200  h-[90vh] w-full'>
      <h2 className='font-bold' >Categories</h2>
      <h3 className={ category === '' ? 'text-gray-900 font-semibold cursor-pointer' :'text-gray-500 cursor-pointer'}
      onClick={() => setCategory('')} >All</h3>
      {
        categories.map((curCategory, i) => <h3 className={` ${curCategory === category ? 'text-gray-900 font-semibold' :'text-gray-500'}  cursor-pointer`} onClick={() => setCategory(curCategory)} key={i} >{curCategory}</h3>)
      }
      
      
    </div>
  )
}

export default Sidebar