import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <>
      <NextSeo title='Circle' />
      <div className=' min-h-screen w-full'>
        <div className='fixed top-0 w-full p-5'>
          <div className=' w-full rounded-full bg-white p-2 pl-8'>
            <div className='flex items-center justify-between'>
              <div className=''>
                <div className=' h-8 w-8 rounded-full bg-gradient-to-tr from-pink-500 to-violet-700 p-1'>
                  <div className=' h-full w-full rounded-full bg-white'></div>
                </div>
              </div>
              <div className='flex flex-row-reverse items-center gap-x-2'>
                <Link
                  href=''
                  className=' flex h-[56px] items-center justify-center rounded-full bg-gray-800 px-8 text-white'
                >
                  Register free
                </Link>
                <Link
                  href='/login'
                  className=' flex h-[56px] items-center justify-center rounded-lg px-8 text-gray-800 hover:bg-gray-100'
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className=' flex h-screen w-full bg-amber-900 p-10'>
          <div className=' flex flex-1 flex-col justify-center'>
            <div className=' space-y-2'>
              <h1 className=' text-[76px] font-black leading-none text-amber-400'>
                Everything you are. In one, simple link in bio.
              </h1>
              <p className=' font-semibold text-amber-400'>
                Join 16M+ people using Linktree for their link in bio.
              </p>
            </div>
            <div className=' mt-8 flex gap-x-2'>
              <div className=' h-[56px] w-60 rounded-lg bg-gray-100 transition focus-within:ring-2 focus-within:ring-black hover:focus-within:ring-2 hover:focus-within:ring-black'>
                <div className=' flex h-full items-center'>
                  <label htmlFor='' className=' ml-4 text-gray-500'>
                    circle.link/
                  </label>
                  <input
                    type='text'
                    className=' h-12 w-full bg-transparent pr-4 text-gray-500 focus:outline-none'
                    placeholder='username'
                  />
                </div>
              </div>
              <div className=' flex h-[56px] items-center justify-center rounded-full bg-indigo-300 px-8  '>
                <p>Claim your circle</p>
              </div>
            </div>
          </div>
          <div className=' flex-1'></div>
        </div>
      </div>
    </>
  )
}
