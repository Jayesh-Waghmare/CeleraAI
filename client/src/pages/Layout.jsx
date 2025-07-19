import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const {user} = useUser()

  return user ? (
    <div className='h-screen flex flex-col'>
      {/* Fixed Navbar */}
      <nav className='fixed top-0 left-0 right-0 z-30 w-full px-8 h-14 flex items-center justify-between border-b border-gray-200 bg-white'>
        <img src={assets.logonew} alt="" className='w-32 sm:w-32 cursor-pointer' onClick={()=> navigate('/')}/>
        
        {
          sidebar ? <X onClick={()=> setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer'/> : <Menu onClick={()=> setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden cursor-pointer'/>
        }
      </nav>

      {/* Main Content Area */}
      <div className='pt-14 flex h-full'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
        <div className='flex-1 bg-[#F4F7FB] overflow-hidden'>
          {/* For Nested Routes */}
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}

export default Layout