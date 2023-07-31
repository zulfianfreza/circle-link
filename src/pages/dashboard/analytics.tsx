import { Dialog, Transition } from '@headlessui/react'
import { getSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import React, { Fragment, useState } from 'react'
import { HiX } from 'react-icons/hi'
import ContentContainer from '~/components/ContentContainer'
import Logo from '~/components/Logo'
import { DashboardTemplate } from '~/components/template'
import { prisma } from '~/server/db'
import { clsxtm } from '~/utils/clsxtm'

export default function AnalyticsPage() {
  return (
    <DashboardTemplate>
      <NextSeo title='Analytics - Circle' />
      <ContentContainer>
        <div className=' w-full rounded-[24px] bg-white p-6 py-10'>
          <div className=' text-center'>
            <h1 className=' text-lg font-medium'>
              Lifetime Analytics <br />
              <span className=' text-sm text-gray-500'>(still dummy)</span>
            </h1>
          </div>
          <div className=' mt-4 flex justify-between'>
            <div className='flex flex-1 flex-col items-center justify-center'>
              <div className='flex items-center gap-x-1'>
                <div className=' h-2 w-2 rounded-full bg-green-500'></div>
                <p className=' text-xs'>Views:</p>
              </div>
              <h1 className=' text-lg'>20</h1>
            </div>
            <div className='flex flex-1 flex-col items-center justify-center'>
              <div className='flex items-center gap-x-1'>
                <div className=' h-2 w-2 rounded-full bg-violet-500'></div>
                <p className=' text-xs'>Click:</p>
              </div>
              <h1 className=' text-lg'>2</h1>
            </div>
            <div className='flex flex-1 flex-col items-center justify-center'>
              <div className='flex items-center gap-x-1'>
                <div className=' h-2 w-2 rounded-full bg-sky-500'></div>
                <p className=' text-xs'>CTR:</p>
              </div>
              <h1 className=' text-lg'>10%</h1>
            </div>
          </div>
        </div>
      </ContentContainer>
    </DashboardTemplate>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  })

  if (user?.username == null || !user?.username) {
    return {
      redirect: {
        destination: '/information',
        permanent: false,
      },
    }
  }
  return { props: {} }
}
