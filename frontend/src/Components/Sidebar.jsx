import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard, MdOutlineAccountCircle, MdOutlineFileUpload, MdOutlinePriceCheck, MdOutlineNotes, MdOutlineLogout } from "react-icons/md";
import { useAuth } from '../Context/AuthContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        setSidebarOpen(false)
    }

    const navItems = [
        { name: 'Dashboard', icon: <MdOutlineDashboard className='inline mr-2 text-2xl' />, path: '/dashboard', end: true },
        { name: 'Profile', icon: <MdOutlineAccountCircle className='inline mr-2 text-2xl' />, path: '/dashboard/profile' },
        { name: 'Upload', icon: <MdOutlineFileUpload className='inline mr-2 text-2xl' />, path: '/dashboard/upload' },
        { name: 'Results', icon: <MdOutlineNotes className='inline mr-2 text-2xl' />, path: '/dashboard/results' },
        { name: 'Pricing', icon: <MdOutlinePriceCheck className='inline mr-2 text-2xl' />, path: '/dashboard/pricing' },
    ]

    return (
        <>
        {/* Overlay for mobile */}
        <div className={`fixed inset-0 bg-black/50 z-20 transition-opacity md:hidden ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={()=>setSidebarOpen(false)}></div>

        {/* Sidebar */}
        <div className={`fixed md:relative top-0 left-0 h-full w-64 bg-slate-950 border-r-2 border-slate-800 z-30 transform transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            
            {/* Logo */}
            <div className='flex items-center gap-2 p-4'>
                <img className="w-10 h-10" src="../favicon.png" alt="logo" />
                <h3 className='text-lg font-bold'>Pitch Pilot</h3>
            </div>

            {/* Mobile only: User info card */}
            <div className='flex flex-col gap-2 bg-slate-900/30 p-3 mx-2 rounded-md md:hidden'>
                <div className='flex gap-3 items-center'>
                    <span className='text-xs'>Remaining Credits:</span>
                    <span className='text-sm font-bold'>{user?.credits || 0}</span>
                </div>
                <div className='flex gap-3 items-center'>
                    <span className='text-xs'>Plan:</span>
                    <span className='text-sm font-bold'>{user?.plans || 'Free'}</span>
                </div>
                <div className='flex gap-3 items-center'>
                    <span className='text-xs'>Name</span>
                    <span className='text-sm font-bold'>{user?.name || '-'}</span>
                </div>
            </div>

            {/* Nav items */}
            <div className='py-2 mt-4 flex flex-col gap-4 w-full pr-2'>
                {navItems.map(item => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                            `px-4 py-4 rounded-sm font-bold flex items-center ${isActive ? 'text-orange-500 border-r-2 border-orange-500 bg-slate-900/50' : 'text-white'}`
                        }
                        onClick={()=>setSidebarOpen(false)}
                    >
                        {item.icon} {item.name}
                    </NavLink>
                ))}
            </div>

            {/* Logout */}
            <div className='mt-auto p-4'>
                <button onClick={handleLogout} className='w-full cursor-pointer py-2 px-4 bg-slate-900/50 hover:bg-slate-800/50 rounded-sm font-bold text-red-500 flex items-center justify-center'>
                    <MdOutlineLogout className='inline mr-2 text-2xl' /> Logout
                </button>
            </div>
        </div>
        </>
    )
}

export default Sidebar