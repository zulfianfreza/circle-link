import type { Links } from '@prisma/client'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { HiOutlinePencil, HiOutlineTrash, HiOutlineX } from 'react-icons/hi'
import { clsxtm } from '~/utils/clsxtm'
import { Switch } from '../ui/switch'
import { trpc } from '~/utils/trpc'

interface CardHeaderProps {
  link: Links
  refetch: () => void
  hotReload: () => void
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  link,
  refetch,
  hotReload,
}) => {
  const [liveEditTitle, setLiveEditTitle] = useState(false)
  const [liveEditContent, setLiveEditContent] = useState(false)
  const [label, setLabel] = useState(link.label ?? '')
  const [content, setContent] = useState(link.content ?? '')
  const [active, setActive] = useState(link.active ?? true)
  const [showDelete, setShowdelete] = useState(false)

  const updateLinkMutation = trpc.link.updateLink.useMutation({
    onSuccess() {
      refetch()
      toast.success('Success')
      hotReload()
    },
  })

  const handleUpdate = (active?: boolean) => {
    updateLinkMutation.mutateAsync({ linkId: link.id, active, label, content })
  }

  const handleUpdateActive = () => {
    setActive(!active)
    handleUpdate(!active)
  }

  const onBlurTitle = () => {
    setLiveEditTitle(!liveEditTitle)
    if (label === link.label) return
    handleUpdate()
  }

  const onBlurContent = () => {
    setLiveEditContent(!liveEditContent)
    if (content === link.content) return
    handleUpdate()
  }

  const deleteMutation = trpc.link.deleteLink.useMutation({
    onSuccess: () => {
      refetch()
      hotReload()
      toast.success('success')
    },
  })

  const handleDelete = () => {
    deleteMutation.mutateAsync({ linkId: link.id })
  }

  return (
    <div className=' w-full overflow-hidden rounded-[24px] bg-white shadow-sm'>
      <div className='flex items-center'>
        <div className='flex cursor-grab items-center p-4 text-gray-500 hover:text-gray-900'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='hover:cursor-grab'
            role='img'
            aria-hidden='false'
            aria-labelledby='ltclid31_title '
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M5 4C5.55228 4 6 3.55228 6 3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3C4 3.55228 4.44772 4 5 4ZM6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7C5.55228 7 6 7.44772 6 8ZM6 13C6 13.5523 5.55228 14 5 14C4.44772 14 4 13.5523 4 13C4 12.4477 4.44772 12 5 12C5.55228 12 6 12.4477 6 13ZM12 8C12 8.55228 11.5523 9 11 9C10.4477 9 10 8.55228 10 8C10 7.44772 10.4477 7 11 7C11.5523 7 12 7.44772 12 8ZM11 14C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12C10.4477 12 10 12.4477 10 13C10 13.5523 10.4477 14 11 14ZM12 3C12 3.55228 11.5523 4 11 4C10.4477 4 10 3.55228 10 3C10 2.44772 10.4477 2 11 2C11.5523 2 12 2.44772 12 3Z'
              fill='currentColor'
            ></path>
          </svg>
        </div>
        <div className=' flex-1 space-y-2 overflow-hidden p-8'>
          <div className=' flex items-center gap-x-2'>
            {!liveEditTitle ? (
              <>
                <p className='  text-sm font-semibold text-gray-800'>{label}</p>
                <HiOutlinePencil
                  className=' cursor-pointer text-gray-600 hover:text-gray-900'
                  onClick={() => {
                    setLiveEditTitle(!liveEditTitle)
                  }}
                />
              </>
            ) : (
              <input
                type='text'
                autoFocus
                onBlur={onBlurTitle}
                defaultValue={label}
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className=' w-full  text-sm font-semibold focus:outline-none'
              />
            )}
          </div>
        </div>
        <div className='flex flex-col items-end justify-center gap-y-2 p-4'>
          <Switch
            className=' data-[state=checked]:bg-green-700 data-[state=unchecked]:bg-gray-200'
            checked={active}
            onCheckedChange={handleUpdateActive}
          />
          <div
            className='cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            onClick={() => setShowdelete(!showDelete)}
          >
            <HiOutlineTrash size={20} />
          </div>
        </div>
      </div>
      <div
        className={clsxtm('  h-0 w-full transition-[height] duration-300', {
          ' h-[150px]': showDelete,
        })}
      >
        <div className=' relative w-full bg-neutral-300 py-2 text-center text-sm font-semibold'>
          <p>Delete</p>
          <div className='absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer'>
            <HiOutlineX
              size={20}
              className=' '
              onClick={() => setShowdelete(!showDelete)}
            />
          </div>
        </div>
        <div className=' space-y-2 p-4'>
          <p className=' text-center'>Are u sure?</p>
          <div className='flex justify-between gap-x-2'>
            <button
              className=' flex h-12 flex-1 items-center justify-center rounded-full border border-black text-sm font-medium'
              onClick={() => setShowdelete(!showDelete)}
            >
              <p>Cancel</p>
            </button>
            <button
              className=' flex h-12 flex-1 items-center justify-center rounded-full bg-violet-700 text-sm font-medium text-white'
              onClick={handleDelete}
            >
              <p>Delete</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
