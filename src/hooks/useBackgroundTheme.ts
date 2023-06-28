import { Theme } from '@prisma/client'
import { FONT_LIST, balsamiqSans, spaceMono } from '~/lib/data/font'
import { BACKGROUND_TYPE } from '~/types/theme'

export const useBackgroundTheme = (theme: Theme) => {
  let themeClass

  let themeStyle

  const fontFamily = theme ? theme.fontFamily : 'Poppins'
  const fontColor = theme ? theme.fontColor : '#000000'
  const backgroundType = theme ? theme.backgroundType : BACKGROUND_TYPE.SOLID
  const backgroundPrimary = theme ? theme.backgroundPrimary : '#ffffff'
  const backgroundSecondary = theme ? theme.backgroundSecondary : '#6d28d9'
  const themeFont = FONT_LIST.find((font) => font.label === fontFamily)?.value
    .className

  if (
    [
      BACKGROUND_TYPE.SOLID as string,
      BACKGROUND_TYPE.GRADIENT as string,
    ].includes(backgroundType)
  ) {
    themeStyle = {
      color: fontColor ?? '#000',
      backgroundColor: backgroundPrimary ?? '#fff',
      backgroundImage: '',
    }
    switch (backgroundType) {
      case BACKGROUND_TYPE.SOLID:
        themeStyle.backgroundColor = backgroundPrimary
          ? backgroundPrimary
          : '#ffffff'
        themeClass = themeFont
        break
      case BACKGROUND_TYPE.GRADIENT:
        themeStyle.backgroundImage = `linear-gradient(to top right, ${backgroundPrimary}, ${backgroundSecondary})`
        themeClass = themeFont
        break
    }
  } else {
    switch (backgroundType) {
      case BACKGROUND_TYPE.CUBE:
        themeClass = `bg-cube ${themeFont}`
        themeStyle = {
          color: fontColor ?? '#000',
        }
        break
      case BACKGROUND_TYPE.COLORFUL:
        themeClass = `bg-colorful ${themeFont}`
        themeStyle = {
          color: fontColor ?? '#000',
        }
        break
      case BACKGROUND_TYPE.POLKA:
        themeClass = `bg-polka ${themeFont}`
        themeStyle = {
          color: fontColor ?? '#000',
        }
        break
      case BACKGROUND_TYPE.HEXAGON:
        themeClass = `bg-hexagon ${themeFont}`
        themeStyle = {
          color: fontColor ?? '#000',
        }
        break
      case BACKGROUND_TYPE.MOON:
        themeClass = `bg-moon ${themeFont}`
        themeStyle = {
          color: fontColor ?? '#000',
        }
        break
      case BACKGROUND_TYPE.SPRINKLE:
        themeClass = `bg-sprinkle ${themeFont}`
        themeStyle = {
          color: fontColor ?? '#000',
        }
        break
      case BACKGROUND_TYPE.COLORED_PATTERNS:
        themeClass = `bg-colored-patterns ${themeFont}`
        themeStyle = {
          color: fontColor ?? '#000',
        }
        break
      case BACKGROUND_TYPE.COLORED_SHAPES:
        themeClass = `bg-colored-shapes ${themeFont}`
        themeStyle = {
          color: fontColor ?? '#000',
        }
        break
      case BACKGROUND_TYPE.CLOUDY:
        themeClass = `bg-cloudy ${themeFont} bg-cover`
        themeStyle = {
          color: fontColor ?? '#000',
        }
        break
      case BACKGROUND_TYPE.CONTOUR_LINE:
        themeClass = `bg-contour-line ${themeFont} bg-cover`
        themeStyle = {
          color: fontColor ?? '#000',
        }
        break
      case BACKGROUND_TYPE.WIREFRAME:
        themeClass = `${balsamiqSans.className} text-black`
        break
      case BACKGROUND_TYPE.MINERAL_BLUE:
        themeClass = `bg-[#e0f6ff] ${spaceMono.className} text-black`

        break
      case BACKGROUND_TYPE.MINERAL_GREEN:
        themeClass = `bg-[#e0faee] ${spaceMono.className} text-black`

        break
      case BACKGROUND_TYPE.MINERAL_ORANGE:
        themeClass = `bg-[#ffeee1] ${spaceMono.className} text-black`

        break
      case BACKGROUND_TYPE.MINERAL_YELLOW:
        themeClass = `bg-[#fff8e0] ${spaceMono.className} text-black`

        break
    }
  }

  return {
    themeClass,
    themeStyle,
  }
}
