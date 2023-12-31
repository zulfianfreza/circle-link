import { Dialog, Transition } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { ICON } from '~/lib/data/icon'
import { clsxtm } from '~/utils/clsxtm'
import { IconType } from 'react-icons'
import { isValidUrl } from '~/utils/isValidUrl'
import { HiArrowLeft, HiOutlineX } from 'react-icons/hi'
import { trpc } from '~/utils/trpc'
import { toast } from 'react-hot-toast'
import useSocialIcon from '~/hooks/useSocialIcon'
import useAddSocialIconModal from '~/hooks/useAddSocialIconModal'
import { SocialIcon } from '@prisma/client'
import useEditSocialIconModal from '~/hooks/useEditSocialIconModal'

enum STEP {
  EDIT = 0,
  DELETE = 1,
}

interface ModalEditSocialIconProps {
  socialIcon: SocialIcon
}

export default function ModalEditSocialIcon() {
  const [step, setStep] = useState(STEP.EDIT)
  const [selectedSocial, setSelectedSocial] = useState('')
  const [url, setUrl] = useState('')

  const { socialIcon } = useEditSocialIconModal()

  useEffect(() => {
    setUrl(socialIcon.url)
  }, [socialIcon])

  const editSocialIconModal = useEditSocialIconModal()

  const handleClose = () => {
    editSocialIconModal.onClose()
    setTimeout(() => {
      setStep(STEP.EDIT)
    }, 300)
    setUrl(url)
  }

  const { hotReloadIframe: refetchSocialIcon } = useSocialIcon()

  const deleteSocialIconMutation = trpc.socialicon.deleteSocialIcon.useMutation(
    {
      onSuccess: () => {
        refetchSocialIcon()
        toast.success('success')
        editSocialIconModal.onClose()
      },
    }
  )

  const handleDelete = () => {
    deleteSocialIconMutation.mutateAsync({ socialIconId: socialIcon.id })
  }

  const updateSocialIconMutation = trpc.socialicon.updateSocialIcon.useMutation(
    {
      onSuccess: () => {
        refetchSocialIcon()
        toast.success('success')
        editSocialIconModal.onClose()
      },
    }
  )

  const handleUpdate = () => {
    updateSocialIconMutation.mutateAsync({ socialIconId: socialIcon.id, url })
  }

  let dialogBody = (
    <>
      <div className=' relative p-4 py-6'>
        <div className=' text-center'>
          <p className=' font-semibold'>Edit {socialIcon.social}</p>
        </div>
        <div
          className=' absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg p-2 hover:bg-gray-100'
          onClick={handleClose}
        >
          <HiOutlineX className=' ' size={20} />
        </div>
      </div>

      <div className='flex flex-col gap-y-8 px-5 pb-5'>
        <Input
          label='URL'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className=' space-y-2'>
          <button
            onClick={handleUpdate}
            className=' flex h-12 w-full items-center justify-center rounded-full bg-violet-700 text-sm font-medium text-white'
          >
            <p>Save</p>
          </button>
          <button
            onClick={() => setStep(step + 1)}
            className=' flex h-12 w-full  items-center justify-center rounded-full border text-sm font-medium text-gray-800'
          >
            <p>Remove Icon</p>
          </button>
        </div>
      </div>
    </>
  )

  if (step === STEP.DELETE) {
    dialogBody = (
      <>
        <div className=' relative p-4 py-6'>
          <div className=' text-center'>
            <p className=' font-semibold'>Remove {socialIcon.social} Icon</p>
          </div>
          <div
            className=' absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg p-2 hover:bg-gray-100'
            onClick={handleClose}
          >
            <HiOutlineX className=' ' size={20} />
          </div>
        </div>
        <div className=' space-y-2 p-5'>
          <button
            onClick={handleDelete}
            className=' flex h-12 w-full items-center justify-center rounded-full bg-violet-700 text-sm font-medium text-white'
          >
            <p>Yes, remove</p>
          </button>
          <button
            onClick={() => setStep(step - 1)}
            className=' flex h-12 w-full  items-center justify-center rounded-full border text-sm font-medium text-gray-800'
          >
            <p>Cancel</p>
          </button>
        </div>
      </>
    )
  }
  return (
    <Transition appear show={editSocialIconModal.isOpen} as={React.Fragment}>
      <Dialog as='div' className='relative z-50' onClose={handleClose}>
        <Transition.Child
          as={React.Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto backdrop-blur-sm'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95 -translate-y-full'
              enterTo='opacity-100 scale-100 translate-y-0'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100 translate-y-0'
              leaveTo='opacity-0 scale-95 translate-y-full'
            >
              <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                {dialogBody}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

interface IconItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: {
    label: string
    icon: IconType
  }
  disabled?: boolean
}

function IconItem({
  icon: { label, icon: Icon },
  disabled,
  ...props
}: IconItemProps) {
  return (
    <button
      disabled={disabled}
      className={clsxtm(
        ' flex h-[60px] w-full cursor-pointer items-center justify-between rounded-full px-6 font-medium hover:bg-gray-100'
      )}
      {...props}
    >
      <div className='flex items-center gap-x-4'>
        <Icon size={20} />
        {label}
      </div>
      {disabled && <p className=' text-sm text-green-700'>Already added</p>}
    </button>
  )
}
