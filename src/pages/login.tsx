import React from 'react'
import { Input } from '~/components/ui/input'
import { getSession, signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  return (
    <div className=' relative flex min-h-screen w-full bg-white'>
      <div className=' w-full md:w-2/3'>
        <div className=' flex justify-center p-10'>
          <div className=' flex w-[640px] flex-col justify-center p-10 pt-28'>
            <div className=' text-center'>
              <h1 className=' text-[44px] font-bold'>Welcome Back</h1>
              <p className='  text-gray-500'>Login to your circle.link</p>
            </div>
            <div className=' mt-16 space-y-3'>
              <Input label='Username' />
              <Input label='Password' />
            </div>
            <p className=' mt-4 text-sm text-violet-700 underline'>
              Forgot password?
            </p>
            <div className=' mt-4 flex flex-col items-center gap-y-2'>
              <div className=' flex h-12 w-full items-center justify-center rounded-full bg-violet-700 text-sm  text-white'>
                <p>Login</p>
              </div>
              <p className=' text-sm'>or</p>
              <button
                className=' flex h-12 w-full cursor-pointer items-center justify-center gap-x-2 rounded-full border border-gray-200 text-sm '
                onClick={(e) => {
                  e.preventDefault()
                  signIn('google', {
                    callbackUrl: '/dashboard',
                    viewCount: 0,
                  })
                }}
              >
                <FcGoogle size={24} />
                <p>Continue with Google</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=' fixed right-0 top-0 h-screen w-1/3 bg-violet-200'></div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)

  if (session != null) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }
  return { props: {} }
}
