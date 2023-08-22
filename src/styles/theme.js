import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'myGreen.300',
          color: 'white',
          _hover: { bg: 'myGreen.200' },
        },
        outline: {
          borderColor: 'myGreen.300',
          bg: 'white',
          color: 'myGreen.300',
          _hover: { bg: 'myGreen.300', color: 'white' },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
  },
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
