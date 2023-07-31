import { getSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import React from 'react'
import ContentContainer from '~/components/ContentContainer'
import { DashboardTemplate } from '~/components/template'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { TABS } from '~/lib/data/constants'
import { TabButtons, TabFonts, TabProfile, TabThemes } from '~/components/tab'
import { trpc } from '~/utils/trpc'
import useProfile from '~/hooks/useProfile'
import useTheme from '~/hooks/useTheme'
import Logo from '~/components/Logo'
import { prisma } from '~/server/db'

export default function AppearancePage() {
  const {
    data: dataProfile,
    hotReloadIframe: refetchProfile,
    isLoading: isLoadingProfile,
  } = useProfile()
  const { data: dataTheme, hotReloadIframe: refetchTheme } = useTheme()

  return (
    <DashboardTemplate>
      <NextSeo title='Appearance - Circle' />
      <ContentContainer>
        <Tabs defaultValue='themes' className=' h-full w-full'>
          <TabsList className='flex h-fit justify-between overflow-x-scroll rounded-full bg-white [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            {TABS.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={tab.value}
                className=' flex-1 rounded-full px-4 py-2.5 font-medium hover:bg-violet-700 hover:text-white data-[state=active]:bg-violet-700 data-[state=active]:text-white'
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {isLoadingProfile ? (
            <div className=' flex h-full w-full items-center justify-center'>
              <Logo className=' h-6 w-6 animate-spin' />
            </div>
          ) : (
            <TabsContent value='profile'>
              <TabProfile refetch={refetchProfile} profile={dataProfile} />
            </TabsContent>
          )}
          <TabsContent value='themes'>
            <TabThemes theme={dataTheme} refetch={refetchTheme} />
          </TabsContent>
          <TabsContent value='buttons'>
            <TabButtons theme={dataTheme} refetch={refetchTheme} />
          </TabsContent>
          <TabsContent value='fonts'>
            <TabFonts theme={dataTheme} refetch={refetchTheme} />
          </TabsContent>
        </Tabs>
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
