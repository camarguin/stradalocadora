import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    myBlack: '#000',
    myWhite: '#fff',
    myBlue: {
      200: '#1D3973',
      300: '#315B84',
    },
    myGreen: {
      200: '#7BCB8C',
      300: '#45BF57',
    },
  },
})

export default theme
