import { Dialog, Transition } from '@headlessui/react'
import { getSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import React, { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import { IconType } from 'react-icons'
import {
  HiArrowLeft,
  HiEmojiHappy,
  HiOutlineEmojiHappy,
  HiOutlinePencil,
  HiOutlineX,
  HiPencil,
} from 'react-icons/hi'
import { SiTwitch } from 'react-icons/si'
import ContentContainer from '~/components/ContentContainer'
import SocialIconItem from '~/components/SocialIconItem'
import CardSocialIcon from '~/components/card/CardSocialIcon'
import { DashboardTemplate } from '~/components/template'
import { Input } from '~/components/ui/input'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Switch } from '~/components/ui/switch'
import useSocialIcon from '~/hooks/useSocialIcon'
import useAddSocialIconModal from '~/hooks/useAddSocialIconModal'
import useTheme from '~/hooks/useTheme'
import { ICON } from '~/lib/data/icon'
import { prisma } from '~/server/db'
import { clsxtm } from '~/utils/clsxtm'
import { isValidUrl } from '~/utils/isValidUrl'
import { trpc } from '~/utils/trpc'
import ModalAddSocialIcon from '~/components/modal/ModalAddSocialIcon'
import ModalEditSocialIcon from '~/components/modal/ModalEditSocialIcon'

enum STEP {
  LIST = 0,
  ADD = 1,
}

export default function SettingsPage() {
  const { data: socialIcons, hotReloadIframe: refetchSocialIcon } =
    useSocialIcon()
  const { data: theme } = useTheme()

  return (
    <>
      <DashboardTemplate>
        <NextSeo title='Settings - Circle' />
        <ContentContainer>
          <div className=''>
            <div className='flex items-center gap-x-2'>
              <div className=' flex h-6 w-6 items-center justify-center rounded-lg bg-violet-700 text-white'>
                <HiEmojiHappy />
              </div>
              <h1 className=' text-lg font-semibold text-gray-900'>
                Social Icon
              </h1>
            </div>
            <CardSocialIcon socialIcons={socialIcons} theme={theme} />
          </div>
          <ModalAddSocialIcon socialIcons={socialIcons} />
          <ModalEditSocialIcon />
        </ContentContainer>
      </DashboardTemplate>
    </>
  )
}

interface IconItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: {
    label: string
    icon: IconType
  }
}

function IconItem({ icon: { label, icon: Icon }, ...props }: IconItemProps) {
  return (
    <button
      className={clsxtm(
        ' flex h-[60px] w-full cursor-pointer items-center gap-x-4 rounded-full px-6 font-medium hover:bg-gray-100'
      )}
      {...props}
    >
      <Icon size={20} />
      {label}
    </button>
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
