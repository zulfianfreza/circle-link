import React from 'react'
import { clsxtm } from '~/utils/clsxtm'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  type?: string
  id?: string
}

export function Input({ label, type = 'text', id, ...props }: InputProps) {
  return (
    <div className=' relative w-full'>
      <input
        type={type}
        placeholder=' '
        id={id}
        {...props}
        className={clsxtm(
          'peer h-12 w-full rounded-lg bg-gray-100 p-2 pl-4 pt-5 text-sm leading-[48px] outline-none transition hover:ring-2 hover:ring-gray-200 focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-70'
        )}
      />
      <label
        htmlFor={id}
        className={clsxtm(
          'pointer-events-none absolute left-4 top-[13px] z-10 origin-[0] -translate-y-2.5 scale-[0.85] transform truncate text-sm text-gray-500 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2.5 peer-focus:scale-[0.85]'
        )}
      >
        {label}
      </label>
    </div>
  )
}
