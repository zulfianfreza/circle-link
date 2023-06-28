import { clsxtm } from '~/utils/clsxtm'
import React, { KeyboardEvent, useCallback, useState } from 'react'
import { User } from '@prisma/client'
import { toast } from 'react-hot-toast'
import { Input } from '~/components/ui/input'
import { trpc } from '~/utils/trpc'
import Avatar from '~/components/Avatar'
import axios from 'axios'
import { deleteImageCloudinary } from '~/hooks/useHandleDeleteImage'

interface TabProfileProps {
  profile: User | undefined | null
  refetch: () => void
}

export function TabProfile({ profile, refetch }: TabProfileProps) {
  const [profileTitle, setProfileTitle] = useState(profile?.profileTitle ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')

  const updateProfileMutation = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      toast.success('success')
      refetch()
    },
  })

  const handleUpdate = (profileImage?: any) => {
    updateProfileMutation.mutateAsync({
      bio,
      profileTitle,
      profileImage,
    })
  }

  const handleUpdateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File
    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0]
    }

    const formData = new FormData()
    formData.append('file', file!)
    formData.append('upload_preset', 'mzh55kat')

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzljovka0/image/upload',
        formData
      )
      console.log(response)
      handleUpdate(response.data.secure_url)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteImage = async () => {
    await deleteImageCloudinary(profile?.profileImage ?? '')
    handleUpdate('')
  }

  const onBlur = () => {
    if (profile?.profileTitle == profileTitle && profile?.bio == bio) return
    if (profileTitle == '') {
      toast.error('please provide your profile title')
      return
    }
    handleUpdate()
  }

  return (
    <div className=' mt-8'>
      <div className=''>
        <h1 className=' text-lg font-semibold text-gray-800'>Profile</h1>
      </div>
      <div className=' mt-2 rounded-[24px] bg-white p-6'>
        <div className='flex gap-x-4'>
          {/* <div className=' h-24 w-24 rounded-full bg-gray-900'></div> */}
          <Avatar
            src={profile?.profileImage ?? profile?.image}
            className=' h-24 w-24'
          />
          <div className=' flex flex-1 flex-col gap-y-2'>
            <input
              type='file'
              name=''
              id='profileImage'
              className='hidden'
              onChange={handleUpdateImage}
            />
            <label
              htmlFor='profileImage'
              className=' flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-violet-700 text-sm font-semibold text-white hover:bg-violet-800'
            >
              <p>Choose an image</p>
            </label>
            <button
              onClick={handleDeleteImage}
              className=' flex h-12 w-full cursor-pointer items-center justify-center rounded-full border border-gray-200 text-sm font-semibold text-gray-900 hover:bg-gray-200'
            >
              <p>Remove</p>
            </button>
          </div>
        </div>
        <div className=' mt-4 flex flex-col gap-y-2'>
          <Input
            label='Profile Title'
            value={profileTitle}
            onChange={(e) => setProfileTitle(e.target.value)}
            onBlur={onBlur}
          />
          <div className=' relative w-full'>
            <textarea
              value={bio}
              onBlur={onBlur}
              onChange={(e) => setBio(e.target.value)}
              placeholder=' '
              className={clsxtm(
                'peer h-24 w-full rounded-lg bg-gray-100 p-2 pl-4 pt-6 text-sm outline-none transition hover:ring-2 hover:ring-gray-200 focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-70'
              )}
            ></textarea>
            <label
              className={clsxtm(
                'absolute left-4 top-4 z-10 origin-[0] -translate-y-2.5 scale-[0.85] transform truncate text-sm text-gray-500 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2.5 peer-focus:scale-[0.85]'
              )}
            >
              Bio
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
