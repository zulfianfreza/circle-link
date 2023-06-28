import { SocialIcon } from '@prisma/client'
import React, { useState } from 'react'
import { ICON } from '~/lib/data/icon'
import Icon from './Icon'
import { HiAtSymbol, HiPencil } from 'react-icons/hi'
import { Switch } from './ui/switch'
import { trpc } from '~/utils/trpc'
import useSocialIcon from '~/hooks/useSocialIcon'
import { toast } from 'react-hot-toast'
import useEditSocialIconModal from '~/hooks/useEditSocialIconModal'
import ModalEditSocialIcon from './modal/ModalEditSocialIcon'

interface SocialIconItemProps {
  socialIcon: SocialIcon
}

export default function SocialIconItem({ socialIcon }: SocialIconItemProps) {
  const [active, setActive] = useState(socialIcon.active)
  const [url, setUrl] = useState(socialIcon.url)

  const icon = ICON.find((icon) => {
    return icon.label == socialIcon.social
  })

  const { hotReloadIframe } = useSocialIcon()

  const updateSocialIconMutation = trpc.socialicon.updateSocialIcon.useMutation(
    {
      onSuccess: () => {
        toast.success('success')
        hotReloadIframe()
      },
    }
  )

  const handleUpdate = () => {
    updateSocialIconMutation.mutateAsync({
      socialIconId: socialIcon.id,
      active: !active,
      url,
    })
  }

  const handleUpdateActive = () => {
    setActive(!active)
    handleUpdate()
  }

  const editSocialIconModal = useEditSocialIconModal()

  const handleOpen = () => {
    editSocialIconModal.onOpen()
    editSocialIconModal.setSocialIcon(socialIcon)
  }

  return (
    <>
      <div className='flex items-center gap-x-4'>
        <button
          className='group flex h-14 flex-1 items-center justify-between gap-x-4 rounded-lg px-4 hover:bg-gray-100'
          onClick={handleOpen}
        >
          <div className='flex items-center gap-x-4'>
            <Icon icon={icon?.icon ?? HiAtSymbol} size={20} />
            <p className=' font-medium'>{socialIcon.social}</p>
          </div>
          <HiPencil size={20} className='hidden group-hover:block' />
        </button>
        <Switch
          className=' data-[state=checked]:bg-green-700 data-[state=unchecked]:bg-gray-200'
          checked={active}
          onCheckedChange={handleUpdateActive}
        />
      </div>
    </>
  )
}
