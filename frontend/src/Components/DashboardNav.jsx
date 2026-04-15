import React from 'react'
import { MdMenu } from 'react-icons/md'
import { useAuth } from '../Context/AuthContext'

const DashboardNav = ({ setSidebarOpen }) => {
    const { user } = useAuth()

    return (
        <header className='flex items-center justify-end py-2 px-4 border-b border-slate-800 bg-slate-950'>
            
            {/* Hamburger for mobile */}
            <MdMenu className='md:hidden text-2xl cursor-pointer' onClick={()=>setSidebarOpen(prev=>!prev)} />

            {/* Desktop: credits / plan / name */}
            <div className='hidden md:flex w-full items-center justify-end gap-4'>
                <div className='rounded-md bg-slate-800/50 p-3 flex flex-col items-center'>
                    <span className='text-xs'>Remaining Credits</span>
                    <span className='text-sm font-bold'>{user?.credits || 0}</span>
                </div>
                <div className='rounded-md bg-slate-800/50 p-3 flex flex-col items-center'>
                    <span className='text-xs'>Plan</span>
                    <span className='text-sm font-bold'>{user?.plans || 'Free'}</span>
                </div>
                <div className='rounded-md bg-slate-800/50 p-3 flex flex-col items-center'>
                    <span className='text-xs'>Name</span>
                    <span className='text-sm font-bold'>{user?.name || '-'}</span>
                </div>
            </div>

        </header>
    )
}

export default DashboardNav