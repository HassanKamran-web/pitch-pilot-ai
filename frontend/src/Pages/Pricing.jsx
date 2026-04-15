import axios from 'axios'
import React from 'react'
import { MdCheck } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import toast from 'react-hot-toast'

const Pricing = () => {
  const { token } = useAuth()

  const handleUpgrade = async (plan) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/payment/checkout`,
      { plan },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    window.location.href = response.data.url
  }
  return (

    <section className="max-w-7xl mx-auto px-6 py-24">

      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Simple Pricing
      </h2>

      <p className="text-slate-400 text-center mt-4">
        Choose a plan that fits your lead generation needs
      </p>
      <div className='w-full flex items-center justify-center'>
      <p className="text-yellow-500/80 text-center mt-4 bg-yellow-500/20 py-2 px-2 rounded-md ">
        ⚠ Demo Mode: Payments are processed using Stripe test mode.
        No real charges will be made.

      </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-14">

        {/* FREE PLAN */}

        <div className="bg-slate-900 p-8 rounded-2xl flex flex-col border border-slate-800">

          <h3 className="text-xl font-semibold">Free</h3>

          <p className="text-slate-400 mt-2">
            Perfect for getting started
          </p>

          <h4 className="text-4xl font-bold mt-6">$0</h4>

          <ul className="mt-6 space-y-3 text-slate-400">

            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> 100 Lead Analysis</li>
            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> AI Lead Scoring</li>
            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> Dashboard Insights</li>
            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> Smart Filtering</li>

          </ul>

          <button disabled className="mt-8 text-gray-500  bg-slate-800 py-3 px-4  w-fit rounded-lg">
            Your Current Plan
          </button>

        </div>


        {/* PRO PLAN */}

        <div className="bg-slate-900 p-8 rounded-2xl border border-orange-500 relative">

          <span className="absolute top-4 right-4 text-xs bg-orange-600 px-3 py-1 rounded-full">
            Popular
          </span>

          <h3 className="text-xl font-semibold">Pro</h3>

          <p className="text-slate-400 mt-2">
            Best for growing teams
          </p>

          <h4 className="text-4xl font-bold mt-6">$10</h4>

          <ul className="mt-6 space-y-3 text-slate-400">

            <li className="flex items-center gap-2"><span className="text-orange-500 font-bsemibold"><MdCheck /></span> 500 Lead Analysis</li>
            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> AI Lead Scoring</li>
            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> Advanced Insights</li>
            <li className="flex items-center gap-2 "><span className="text-orange-500 font-semibold"><MdCheck /></span> Smart Filtering</li>

          </ul>

          <button onClick={() => { handleUpgrade("Pro") }} className="mt-8 w-full bg-orange-500 hover:bg-orange-600 cursor-pointer transition-all duration-200 ease-in py-3 rounded-lg">
            Upgrade
          </button>

        </div>


        {/* PREMIUM PLAN */}

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">

          <h3 className="text-xl font-semibold">Premium</h3>

          <p className="text-slate-400 mt-2">
            For power users
          </p>

          <h4 className="text-4xl font-bold mt-6">$20</h4>

          <ul className="mt-6 space-y-3 text-slate-400">

            <li className="flex items-center gap-2"><span className="text-orange-500"><MdCheck /></span> 1000 Lead Analysis</li>
            <li className="flex items-center gap-2"><span className="text-orange-500"><MdCheck /></span> AI Lead Scoring</li>
            <li className="flex items-center gap-2"><span className="text-orange-500"><MdCheck /></span> Advanced Insights</li>
            <li className="flex items-center gap-2"><span className="text-orange-500"><MdCheck /></span>Smart Filtering </li>

          </ul>

          <button onClick={() => handleUpgrade("Premium")} className="mt-8 w-full cursor-pointer bg-slate-800 py-3 rounded-lg">
            Upgrade
          </button>

        </div>

      </div>

    </section>
  )
}

export default Pricing