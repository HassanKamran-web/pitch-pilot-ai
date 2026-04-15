import React, { useMemo, useState } from 'react'

const Filter = ({ qualityFilter, setQualityFilter, statusFilter, setStatusFilter, search, setSearch, leads }) => {

    return (
        <div className='flex flex-col lg:flex-row gap-3 w-full lg:w-fit'>
            <div className='flex gap-2'>
                <select
                    className="
  w-full sm:w-auto
  bg-slate-900 
  text-sm md:text-base
  px-3 py-2
  rounded-md
  cursor-pointer
  hover:bg-slate-800
  transition-all duration-200
  border border-slate-700
  focus:outline-none focus:border-orange-500
  "
                    onChange={(e) => setQualityFilter(e.target.value)}
                >
                    <option value="">Quality All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <select className="w-full sm:w-auto
  bg-slate-900 
  text-sm md:text-base
  px-3 py-2
  rounded-md
  cursor-pointer
  hover:bg-slate-800
  transition-all duration-200
  border border-slate-700
  focus:outline-none focus:border-orange-500
  " onChange={e => setStatusFilter(e.target.value)}>
                    <option className='bg-slate-900' value="">Status All</option>
                    <option className='bg-slate-900' value="generated">Generated</option>
                    <option className='bg-slate-900' value="pending">Pending</option>
                    <option className='bg-slate-900' value="failed">Failed</option>
                </select>
            </div>

            <input
                className='outline-none border-b-2 px-2 border-slate-800 py-2 focus-within:border-orange-500 transition-all duration-200 ease-in'
                type="text"
                placeholder="Search Company or Email"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

        </div>
    )
}

export default Filter