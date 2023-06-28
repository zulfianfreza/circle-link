import {
  HiExternalLink,
  HiOutlineLink,
  HiOutlineLogout,
  HiOutlineShare,
} from 'react-icons/hi'
import { MenuItem, MenuItemMobile } from './MenuItem'
import Link from 'next/link'
import Logo from '../Logo'
import { signOut, useSession } from 'next-auth/react'
import { trpc } from '~/utils/trpc'
import { Popover, Transition } from '@headlessui/react'
import Avatar from '../Avatar'
import React from 'react'
import { MENU } from '~/lib/data/constants'

export function Navbar() {
  const { data: user } = trpc.user.getCurrentUser.useQuery()

  return (
    <div className=' fixed top-0 z-50 w-full bg-gray-100 p-0 md:p-2 md:pb-0'>
      <div className=' w-full rounded-none border-b border-b-gray-100 bg-white p-4 shadow-sm md:rounded-full md:p-3 md:pl-8'>
        <div className='flex items-center justify-between'>
          <div className=' mr-4 flex'>
            <Logo className=' h-6 w-6' />
          </div>
          <div className=' hidden w-full flex-1 gap-x-2 overflow-x-scroll [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:flex [&::-webkit-scrollbar]:hidden '>
            {MENU.map((menu, index) => (
              <MenuItem
                key={index}
                label={menu.label}
                href={menu.href}
                icon={menu.icon}
              />
            ))}
          </div>
          <div className='ml-2 flex flex-row-reverse items-center gap-x-2'>
            <Popover className=' relative h-10'>
              {({ open }) => (
                <>
                  <Popover.Button className=' rounded-full focus:ring-2 focus:ring-black focus:ring-offset-2'>
                    <Avatar src={user?.image} />
                  </Popover.Button>
                  <Transition
                    as={React.Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute right-0 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0'>
                      <div className='overflow-hidden rounded-[20px] shadow-lg ring-1 ring-black ring-opacity-5'>
                        <div className=' bg-white p-6'>
                          <div className=' flex items-center gap-x-6'>
                            <div className=''>
                              <Avatar src={user?.image} />
                            </div>
                            <div className=''>
                              <h1 className=' font-semibold '>
                                @{user?.username}
                              </h1>
                              <p className=' text-sm text-gray-500'>
                                {process.env.NEXT_PUBLIC_BASE_URL}/
                                {user?.username}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className=' bg-white p-2'>
                          <div
                            className='flex h-12 cursor-pointer items-center gap-x-4 rounded-2xl px-4 text-gray-700 hover:bg-gray-100'
                            onClick={() => signOut({ callbackUrl: '/login' })}
                          >
                            <HiOutlineLogout size={20} />
                            <p>Logout</p>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}/${user?.username}`}
              target='_blank'
              className=' flex h-10 cursor-pointer items-center gap-x-2 rounded-full bg-violet-700 px-4 py-2 pr-5 text-sm font-semibold text-white hover:bg-violet-600'
            >
              <HiExternalLink />
              Visit
            </Link>
            <div className=' flex h-10 cursor-pointer items-center gap-x-2 rounded-full border-[1px] border-violet-700 px-4 py-2 pr-5 text-sm font-semibold text-violet-700 hover:bg-violet-600 hover:text-white'>
              <HiOutlineShare />
              Share
            </div>
          </div>
        </div>
      </div>
      <div className=' flex w-full border-b border-b-gray-100 bg-white shadow-sm md:hidden'>
        {MENU.map((menu, index) => (
          <MenuItemMobile
            key={index}
            href={menu.href}
            label={menu.label}
            icon={menu.icon}
          />
        ))}
      </div>
    </div>
  )
}
