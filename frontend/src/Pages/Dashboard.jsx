import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import axios from 'axios'
import DashboardNav from '../Components/DashboardNav'
import { useAuth } from '../Context/AuthContext'
import toast  from 'react-hot-toast'
import { useEffect } from 'react'

const Dashboard = () => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [Isloading, setIsLoading] = useState(false)
  const { token } = useAuth();
  const [data, setData] = useState({
    totalLeads: 0,
    high: 0,
    medium: 0,
    low: 0
  });

   const fetchInsights = async () => {
      try{
        setIsLoading(true)
         const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/leads/insights`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
          const result = response.data

          if(response.status === 200){
            setData(result)
          }

      }catch(err){
        toast.error("Failed to fetch insights")
      }
      finally{
        setIsLoading(false)
      }
    }

    useEffect(() => {
      fetchInsights()
    }, [])

  const [loading,setLoading] = useState(true)

  return (
    <div className='flex h-screen text-white bg-slate-950'>
      
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className='flex flex-col flex-1 h-screen overflow-auto'>
        <DashboardNav setSidebarOpen={setSidebarOpen} />

        <main className='p-4 flex-1 bg-slate-950'>
          {location.pathname === '/dashboard' ? (
             <div className="min-h-screen bg-slate-950 p-4 md:p-8">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Dashboard Insights
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Leads */}
        <div className="bg-slate-900 border-2 border-white rounded-xl shadow p-6">
          <h2 className="text-white  text-sm">Total Leads</h2>
          <p className="text-3xl font-bold mt-2">{data.totalLeads}</p>
        </div>

        {/* High Quality */}
        <div className="bg-slate-900 border-2 border-green-400 rounded-xl shadow p-6">
          <h2 className="text-green-700 text-sm">High Quality</h2>
          <p className="text-3xl font-bold mt-2">{data.high}</p>
        </div>

        {/* Medium Quality */}
        <div className="bg-slate-900 border-2 border-yellow-400 rounded-xl shadow p-6">
          <h2 className="text-yellow-700 text-sm">Medium Quality</h2>
          <p className="text-3xl font-bold mt-2">{data.medium}</p>
        </div>

        {/* Low Quality */}
        <div className="bg-slate-900 border-2 border-red-400 rounded-xl shadow p-6">
          <h2 className="text-red-700 text-sm">Low Quality</h2>
          <p className="text-3xl font-bold mt-2">{data.low}</p>
        </div>

      </div>

    </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard