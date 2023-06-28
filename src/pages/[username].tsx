import { Links, SocialIcon, Theme, User } from '@prisma/client'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { HiAtSymbol } from 'react-icons/hi'
import Avatar from '~/components/Avatar'
import Icon from '~/components/Icon'
import Logo from '~/components/Logo'
import { useBackgroundTheme } from '~/hooks/useBackgroundTheme'
import useButtonTheme from '~/hooks/useButtonTheme'
import useDataUpdated from '~/hooks/useDataUpdated'
import { plusJakartaSans, poppins } from '~/lib/data/font'
import { ICON } from '~/lib/data/icon'
import { prisma } from '~/server/db'
import { BUTTON_TYPE } from '~/types/theme'
import { clsxtm } from '~/utils/clsxtm'
import { trpc } from '~/utils/trpc'

interface CirclePageProps {
  user: User
  links: Links[]
  theme: Theme
  socialIcons: SocialIcon[]
}

export default function CirclePage({
  user,
  links,
  theme,
  socialIcons,
}: CirclePageProps) {
  const { themeData, linksData, profileData, socialIconsData } = useDataUpdated(
    theme,
    links,
    user,
    socialIcons
  )

  const { themeClass, themeStyle } = useBackgroundTheme(themeData)
  const buttonStyle = useButtonTheme(themeData)

  const profileTitle = profileData?.profileTitle ?? profileData?.username
  const bio = profileData?.bio
  const buttonType = themeData ? themeData.buttonType : BUTTON_TYPE.HARDSHADOW

  const socialIconPosition = themeData?.socialIconPosition ?? 'top'

  const socialIconPositionClass =
    socialIconPosition == 'top' ? 'flex-col' : 'flex-col-reverse'

  return (
    <>
      <NextSeo title={`${profileTitle} - Circle`} />
      <div
        className={clsxtm(
          ' flex min-h-screen w-full flex-col justify-between bg-white bg-cover bg-center',
          themeClass
        )}
        style={themeStyle}
      >
        <div className=' relative mx-auto w-full max-w-xl p-4 pb-0 pt-16'>
          <div className=' flex flex-col items-center justify-center gap-y-4 md:flex-row'>
            <div className=' flex flex-col items-center justify-center gap-x-8'>
              <Avatar
                src={profileData?.profileImage ?? profileData?.image}
                className=' h-24 w-24'
              />
              <div className=' mt-2 flex flex-1 flex-col gap-y-2'>
                <div className=' text-center'>
                  <p className=' text-xl font-bold '>
                    {profileTitle ?? 'Profile Title'}
                  </p>
                  <p className=' text-center font-medium'>{bio ?? 'Bio'}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsxtm(
              'mt-4 flex flex-col gap-y-6',
              socialIconPositionClass
            )}
          >
            <div className='flex flex-wrap items-center justify-center gap-2'>
              {socialIconsData.map((socialIcon, index) => {
                const icon = ICON.find((icon) => {
                  return icon.label == socialIcon.social
                })
                return (
                  socialIcon.active && (
                    <Link href={socialIcon.url} target='_blank' key={index}>
                      <Icon icon={icon?.icon ?? HiAtSymbol} size={20} />
                    </Link>
                  )
                )
              })}
            </div>

            <div className='flex flex-col gap-y-3'>
              {linksData?.map((link) =>
                link.type == 'link'
                  ? link.active && (
                      <Link
                        href={link.content ?? ''}
                        target='_blank'
                        key={link.id}
                        className={clsxtm(
                          ' flex h-12 w-full items-center justify-center px-4'
                          // {
                          //   'w-[calc(100%-4px)]':
                          //     buttonType === BUTTON_TYPE.HARDSHADOW ||
                          //     buttonType === BUTTON_TYPE.HARDSHADOWROUNDED ||
                          //     buttonType === BUTTON_TYPE.HARDSHADOWROUNDEDFULL,
                          // }
                        )}
                        style={buttonStyle}
                      >
                        <p className=' text-sm'>{link.label}</p>
                      </Link>
                    )
                  : link.type == 'header'
                  ? link.active && (
                      <div
                        className='flex w-full justify-center font-semibold'
                        key={link.id}
                      >
                        <p>{link.label}</p>
                      </div>
                    )
                  : null
              )}
            </div>
          </div>
        </div>
        <div
          className={clsxtm(
            ' flex items-center justify-center  gap-x-1 justify-self-end py-8 font-semibold'
          )}
        >
          <Logo className=' h-6 w-6' />
          <p className={clsxtm(' text-gray-800', plusJakartaSans.className)}>
            Circle
          </p>
        </div>
      </div>
    </>
  )
}

interface GetServerSideProps {
  params: {
    username: string
  }
}

export async function getServerSideProps({ params }: GetServerSideProps) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
  })

  const links = await prisma.links.findMany({
    where: {
      userId: user ? user.id : null,
    },
    orderBy: [{ index: 'asc' }],
  })

  const socialIcons = await prisma.socialIcon.findMany({
    where: {
      userId: user ? user.id : undefined,
    },
  })

  const theme = await prisma.theme.findFirst({
    where: {
      userId: user ? user.id : null,
    },
  })

  return {
    props: {
      user,
      links,
      theme,
      socialIcons,
    },
  }
}
