import { useSession } from 'next-auth/react'
import PreviewPage from '../PreviewPage'
import { Navbar } from '../navbar'
import { trpc } from '~/utils/trpc'

interface DashboardTemplateProps {
  children: React.ReactNode
}

export function DashboardTemplate(props: DashboardTemplateProps) {
  const { data } = trpc.user.getCurrentUser.useQuery()
  return (
    <>
      <Navbar />
      <div className=' flex w-full bg-gray-100'>
        <PreviewPage
          domain={`${process.env.NEXT_PUBLIC_BASE_URL}/${data?.username}`}
        />
        {props.children}
      </div>
    </>
  )
}
