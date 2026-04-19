import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import axios from 'axios'
import DashboardNav from '../Components/DashboardNav'
import { useAuth } from '../Context/AuthContext'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

const Dashboard = () => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [Isloading, setIsLoading] = useState(false)
  const { token } = useAuth();
  const navigate = useNavigate()
  const [data, setData] = useState({
    totalLeads: 0,
    high: 0,
    medium: 0,
    low: 0
  });
  const chartData = [
    { name: 'High', value: data.high, color: '#22c55e' }, 
    { name: 'Medium', value: data.medium, color: '#eab308' }, 
    { name: 'Low', value: data.low, color: '#f87171' }, 
  ];

  const fetchInsights = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/leads/insights`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = response.data

      if (response.status === 200) {
        setData(result)
      }

    } catch (err) {
      toast.error("Failed to fetch insights")
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInsights()
  }, [navigate])

  const [loading, setLoading] = useState(true)

  return (
    <div className='flex h-screen text-white bg-slate-950'>


      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


      <div className='flex flex-col flex-1 h-screen overflow-auto'>
        <DashboardNav setSidebarOpen={setSidebarOpen} />

        <main className='p-4 flex-1 bg-slate-950 text-slate-100'>
          {location.pathname === '/dashboard' ? (
            <div className="max-w-7xl mx-auto p-4 md:p-8">

              <div className="mb-8">
                <h1 className="text-3xl font-extrabold">Dashboard <span className="text-orange-500">Insights</span></h1>
                <p className="text-slate-400 text-sm">Analytics and lead distribution overview.</p>
              </div>

              <div className="grid grid-cols-1 mb-4 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="group relative bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
                  <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Leads</h2>
                  
                    <p className="text-4xl font-black text-white mt-3">{data.totalLeads}</p>
                    <span className="text-xs text-slate-500 font-medium mt-2">All time</span>
                </div>

                <div className="group relative bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-green-500/10">
                  <h2 className="text-green-500 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    High Quality
                  </h2>
                  <p className="text-4xl font-black text-white mt-3">{data.high}</p>
                  <p className="text-[10px] text-slate-500 mt-2">Conversion ready leads</p>
                </div>

                <div className="group relative bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-yellow-500/10">
                  <h2 className="text-yellow-500 text-xs font-bold uppercase tracking-wider">Medium Quality</h2>
                  <p className="text-4xl font-black text-white mt-3">{data.medium}</p>
                  <p className="text-[10px] text-slate-500 mt-2">Follow-up recommended</p>
                </div>

                <div className="group relative bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-red-500/10">
                  <h2 className="text-red-400 text-xs font-bold uppercase tracking-wider">Low Quality</h2>
                  <p className="text-4xl font-black text-white mt-3">{data.low}</p>
                  <p className="text-[10px] text-slate-500 mt-2">Needs more nurturing</p>
                </div>

              </div>

              <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
                <div className="mb-6">
                  <h2 className="text-xl font-bold">Lead Quality Analysis</h2>
                  <p className="text-sm text-slate-500">Visual breakdown of lead performance</p>
                </div>

                <div className="h-87.5 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                      />
                      <Tooltip
                        cursor={{ fill: '#1e293b' }}
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          border: '1px solid #1e293b',
                          borderRadius: '12px',
                          color: '#fff'
                        }}
                      />
                      <Bar
                        dataKey="value"
                        radius={[10, 10, 0, 0]}
                        barSize={60}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
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