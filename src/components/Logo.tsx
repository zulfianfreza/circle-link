import React from 'react'
import { clsxtm } from '~/utils/clsxtm'

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={clsxtm(
        ' h-8 w-8 rounded-full bg-gradient-to-tr from-fuchsia-500 to-violet-700 p-1',
        className
      )}
    >
      <div className=' h-full w-full rounded-full bg-white'></div>
    </div>
  )
}
