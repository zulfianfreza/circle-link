import { clsxtm } from '~/utils/clsxtm'
import React, { useState } from 'react'
import { Theme } from '@prisma/client'
import { toast } from 'react-hot-toast'
import { Balsamiq_Sans } from 'next/font/google'
import ColorPicker from '../ColorPicker'
import { BACKGROUND_TYPE } from '~/types/theme'
import { trpc } from '~/utils/trpc'
import { HiOutlinePhotograph, HiPhotograph } from 'react-icons/hi'

const balsamiqSans = Balsamiq_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
})

interface TabThemesProps {
  theme: Theme | null | undefined
  refetch: () => void
}

export function TabThemes({ theme, refetch }: TabThemesProps) {
  const [backgroundPrimary, setBackgroundPrimary] = useState(
    theme?.backgroundPrimary ?? '#ffffff'
  )
  const [backgroundSecondary, setBackgroundSecondary] = useState(
    theme?.backgroundSecondary ?? '#ffffff'
  )
  const [backgroundType, setBackgroundType] = useState(
    theme?.backgroundType ?? BACKGROUND_TYPE.SOLID
  )

  const updateThemeMutation = trpc.theme.updateTheme.useMutation({
    onSuccess: () => {
      toast.success('success')
      refetch()
    },
  })

  const handleUpdate = (backgroundType?: string) => {
    updateThemeMutation.mutateAsync({
      backgroundType,
      backgroundPrimary,
      backgroundSecondary,
    })
  }

  const handleUpdateBgType = async (type: BACKGROUND_TYPE) => {
    handleUpdate(type)
    setBackgroundType(type)
  }

  const onBlur = async () => {
    handleUpdate()
  }

  const setColorPrimary = (color: string) => {
    setBackgroundPrimary(color)
  }

  const setColorSecondary = (color: string) => {
    setBackgroundSecondary(color)
  }

  const handleClickScroll = () => {
    const element = document.getElementById('background-section')
    const headerOffset = 90
    const elementPosition = element?.getBoundingClientRect().top
    const offsetPosition = elementPosition! + window.pageYOffset - headerOffset
    if (element) {
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className=' mt-8'>
        <div className=''>
          <h1 className=' text-lg font-semibold text-gray-900'>Themes</h1>
        </div>
        <div className=' mt-2 rounded-[24px] bg-white p-6'>
          <div className='grid grid-cols-4 gap-6 md:grid-cols-3 lg:grid-cols-4'>
            <button
              className='flex flex-col items-center justify-center gap-y-2'
              onClick={handleClickScroll}
            >
              <div className=' flex aspect-[10/16] w-full items-center justify-center rounded-xl border-[1.5px] border-dashed border-black text-center uppercase'>
                <p className=' text-lg'>
                  Create <br />
                  Your <br />
                  Own
                </p>
              </div>
              <p className=' text-sm text-gray-700'>Custom</p>
            </button>
            <div
              className={clsxtm(
                'flex cursor-pointer flex-col items-center justify-center gap-y-2'
              )}
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.WIREFRAME)}
            >
              <div
                className={clsxtm(
                  ' aspect-[10/16] w-full',
                  balsamiqSans.className,
                  {
                    'rounded-lg p-2 ring-2 ring-violet-300':
                      backgroundType == BACKGROUND_TYPE.WIREFRAME,
                  }
                )}
              >
                <div className=' h-full w-full rounded-lg border border-gray-200 bg-white '>
                  <div className=' flex h-full flex-col justify-center gap-y-2 p-4'>
                    <div className=' flex h-4 w-full items-center justify-center border border-black shadow-[2px_2px_0_0_#000000]'>
                      <p className={' text-[8px]'}>Link</p>
                    </div>
                    <div className=' flex h-4 w-full items-center justify-center border border-black shadow-[2px_2px_0_0_#000000]'>
                      <p className={' text-[8px]'}>Link</p>
                    </div>
                    <div className=' flex h-4 w-full items-center justify-center border border-black shadow-[2px_2px_0_0_#000000]'>
                      <p className={' text-[8px]'}>Link</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className=' text-sm text-gray-700'>Wireframe</p>
            </div>
            <div
              className={clsxtm(
                'flex cursor-pointer flex-col items-center justify-center gap-y-2'
              )}
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.MINERAL_BLUE)}
            >
              <div
                className={clsxtm(
                  ' aspect-[10/16] w-full',
                  balsamiqSans.className,
                  {
                    'rounded-lg p-2 ring-2 ring-violet-300':
                      backgroundType == BACKGROUND_TYPE.MINERAL_BLUE,
                  }
                )}
              >
                <div className=' h-full w-full rounded-lg border border-gray-200 bg-[#e0f6ff] '>
                  <div className=' flex h-full flex-col justify-center gap-y-2 p-4'>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                  </div>
                </div>
              </div>
              <p className=' text-sm text-gray-700'>Mineral Blue</p>
            </div>
            <div
              className={clsxtm(
                'flex cursor-pointer flex-col items-center justify-center gap-y-2'
              )}
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.MINERAL_GREEN)}
            >
              <div
                className={clsxtm(
                  ' aspect-[10/16] w-full',
                  balsamiqSans.className,
                  {
                    'rounded-lg p-2 ring-2 ring-violet-300':
                      backgroundType == BACKGROUND_TYPE.MINERAL_GREEN,
                  }
                )}
              >
                <div className=' h-full w-full rounded-lg border border-gray-200 bg-[#e0faee] '>
                  <div className=' flex h-full flex-col justify-center gap-y-2 p-4'>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                  </div>
                </div>
              </div>
              <p className=' text-sm text-gray-700'>Mineral Green</p>
            </div>
            <div
              className={clsxtm(
                'flex cursor-pointer flex-col items-center justify-center gap-y-2'
              )}
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.MINERAL_ORANGE)}
            >
              <div
                className={clsxtm(
                  ' aspect-[10/16] w-full',
                  balsamiqSans.className,
                  {
                    'rounded-lg p-2 ring-2 ring-violet-300':
                      backgroundType == BACKGROUND_TYPE.MINERAL_ORANGE,
                  }
                )}
              >
                <div className=' h-full w-full rounded-lg border border-gray-200 bg-[#ffeee1] '>
                  <div className=' flex h-full flex-col justify-center gap-y-2 p-4'>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                  </div>
                </div>
              </div>
              <p className=' text-sm text-gray-700'>Mineral Orange</p>
            </div>
            <div
              className={clsxtm(
                'flex cursor-pointer flex-col items-center justify-center gap-y-2'
              )}
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.MINERAL_YELLOW)}
            >
              <div
                className={clsxtm(
                  ' aspect-[10/16] w-full',
                  balsamiqSans.className,
                  {
                    'rounded-lg p-2 ring-2 ring-violet-300':
                      backgroundType == BACKGROUND_TYPE.MINERAL_YELLOW,
                  }
                )}
              >
                <div className=' h-full w-full rounded-lg border border-gray-200 bg-[#fff8e0] '>
                  <div className=' flex h-full flex-col justify-center gap-y-2 p-4'>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                    <div className=' h-4 w-full rounded-full border-[1.2px] border-gray-300'></div>
                  </div>
                </div>
              </div>
              <p className=' text-sm text-gray-700'>Mineral Yellow</p>
            </div>
          </div>
        </div>
      </div>
      <div className=' mt-8' id='background-section'>
        <div className=''>
          <h1 className=' text-lg font-semibold text-gray-900'>Backgrounds</h1>
        </div>
        <div className=' mt-2 rounded-[24px] bg-white p-6'>
          <div className='grid grid-cols-4 gap-6 md:grid-cols-3 lg:grid-cols-4'>
            <div
              className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.SOLID)}
            >
              <div
                className={clsxtm(' aspect-[10/16] w-full', {
                  'rounded-lg p-2 ring-2 ring-violet-300':
                    backgroundType == BACKGROUND_TYPE.SOLID,
                })}
              >
                <div className=' h-full w-full rounded-lg bg-gray-700 '></div>
              </div>
              <p className=' text-sm text-gray-700'>Solid</p>
            </div>
            <div
              className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.GRADIENT)}
            >
              <div
                className={clsxtm(' aspect-[10/16] w-full', {
                  'rounded-lg p-2 ring-2 ring-violet-300':
                    backgroundType == BACKGROUND_TYPE.GRADIENT,
                })}
              >
                <div className=' h-full w-full rounded-xl bg-gradient-to-tr from-fuchsia-500 to-violet-700  '></div>
              </div>
              <p className=' text-sm text-gray-700'>Gradient</p>
            </div>
            {/* <div
              className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.IMAGE)}
            >
              <div
                className={clsxtm(' aspect-[10/16] w-full', {
                  'rounded-lg p-2 ring-2 ring-violet-300':
                    backgroundType == BACKGROUND_TYPE.IMAGE,
                })}
              >
                <div className=' flex h-full w-full items-center justify-center rounded-xl bg-gray-100'>
                  <HiOutlinePhotograph className=' opacity-50' size={36} />
                </div>
              </div>
              <p className=' text-sm text-gray-700'>Image</p>
            </div> */}
            <div
              className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.CUBE)}
            >
              <div
                className={clsxtm(' aspect-[10/16] w-full', {
                  'rounded-lg p-2 ring-2 ring-violet-300':
                    backgroundType == BACKGROUND_TYPE.CUBE,
                })}
              >
                <div className=' bg-cube aspect-[10/16] h-full w-full rounded-xl bg-cover bg-center'></div>
              </div>
              <p className=' text-sm text-gray-700'>Cube</p>
            </div>
            <div
              className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
              onClick={() =>
                handleUpdateBgType(BACKGROUND_TYPE.COLORED_PATTERNS)
              }
            >
              <div
                className={clsxtm(' aspect-[10/16] w-full', {
                  'rounded-lg p-2 ring-2 ring-violet-300':
                    backgroundType == BACKGROUND_TYPE.COLORED_PATTERNS,
                })}
              >
                <div className=' bg-colored-patterns aspect-[10/16] h-full w-full rounded-xl bg-cover bg-center'></div>
              </div>
              <p className=' text-sm text-gray-700'>Colored Patterns</p>
            </div>
            <div
              className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.COLORED_SHAPES)}
            >
              <div
                className={clsxtm(' aspect-[10/16] w-full', {
                  'rounded-lg p-2 ring-2 ring-violet-300':
                    backgroundType == BACKGROUND_TYPE.COLORED_SHAPES,
                })}
              >
                <div className=' bg-colored-shapes aspect-[10/16] h-full w-full rounded-xl bg-cover bg-center'></div>
              </div>
              <p className=' text-sm text-gray-700'>Colored Shapes</p>
            </div>
            <div
              className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.HEXAGON)}
            >
              <div
                className={clsxtm(' aspect-[10/16] w-full', {
                  'rounded-lg p-2 ring-2 ring-violet-300':
                    backgroundType == BACKGROUND_TYPE.HEXAGON,
                })}
              >
                <div className=' bg-hexagon aspect-[10/16] h-full w-full rounded-xl bg-cover bg-center'></div>
              </div>
              <p className=' text-sm text-gray-700'>Hexagon</p>
            </div>
            <div
              className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.MOON)}
            >
              <div
                className={clsxtm(' aspect-[10/16] w-full', {
                  'rounded-lg p-2 ring-2 ring-violet-300':
                    backgroundType == BACKGROUND_TYPE.MOON,
                })}
              >
                <div className=' bg-moon aspect-[10/16] h-full w-full rounded-xl bg-cover bg-center'></div>
              </div>
              <p className=' text-sm text-gray-700'>Moon</p>
            </div>
            <div
              className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.SPRINKLE)}
            >
              <div
                className={clsxtm(' aspect-[10/16] w-full', {
                  'rounded-lg p-2 ring-2 ring-violet-300':
                    backgroundType == BACKGROUND_TYPE.SPRINKLE,
                })}
              >
                <div className=' bg-sprinkle aspect-[10/16] h-full w-full rounded-xl bg-cover bg-center'></div>
              </div>
              <p className=' text-sm text-gray-700'>Sprinkle</p>
            </div>
            <div
              className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.CLOUDY)}
            >
              <div
                className={clsxtm(' aspect-[10/16] w-full', {
                  'rounded-lg p-2 ring-2 ring-violet-300':
                    backgroundType == BACKGROUND_TYPE.CLOUDY,
                })}
              >
                <div className=' bg-cloudy aspect-[10/16] h-full w-full rounded-xl bg-cover bg-center'></div>
              </div>
              <p className=' text-sm text-gray-700'>Cloudy</p>
            </div>
            <div
              className='flex cursor-pointer flex-col items-center justify-center gap-y-2'
              onClick={() => handleUpdateBgType(BACKGROUND_TYPE.CONTOUR_LINE)}
            >
              <div
                className={clsxtm(' aspect-[10/16] w-full', {
                  'rounded-lg p-2 ring-2 ring-violet-300':
                    backgroundType == BACKGROUND_TYPE.CONTOUR_LINE,
                })}
              >
                <div className=' bg-contour-line aspect-[10/16] h-full w-full rounded-xl bg-cover bg-center'></div>
              </div>
              <p className=' text-sm text-gray-700'>Contour Line</p>
            </div>
          </div>
          {backgroundType == BACKGROUND_TYPE.SOLID ||
          backgroundType == BACKGROUND_TYPE.GRADIENT ? (
            <ColorPicker
              label='Background'
              value={backgroundPrimary}
              onBlur={onBlur}
              setColor={setColorPrimary}
            />
          ) : null}
          {backgroundType == BACKGROUND_TYPE.GRADIENT ? (
            <ColorPicker
              label='Background'
              value={backgroundSecondary}
              onBlur={onBlur}
              setColor={setColorSecondary}
            />
          ) : null}
        </div>
      </div>
    </>
  )
}
