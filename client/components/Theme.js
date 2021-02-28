import {createMuiTheme} from '@material-ui/core/styles'

const colorOne = '#C3A789'
const colorTwo = '#D8DDE7'
const colorThree = '#EFE9E4'
const colorFour = '#D1C9B3'
const colorWhite = '#fff'

export default createMuiTheme({
  palette: {
    common: {
      colorOne: colorOne,
      colorTwo: colorTwo,
      colorThree: colorThree,
      colorFour: colorFour,
      colorWhite: colorWhite
    },
    primary: {
      main: colorOne
    },
    secondary: {
      main: colorTwo
    }
  },
  typography: {
    h1: {
      fontSize: '2.8rem',
      fontWeight: 400,
      fontFamily: ['Josefin Slab, serif'].join(','),
      letterSpacing: 5
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 400,
      fontFamily: ['Josefin Slab, serif'].join(','),
      letterSpacing: 5
    },
    tab: {
      fontSize: '1em',
      fontWeight: 400,
      fontFamily: ['Josefin Slab, serif'].join(','),
      letterSpacing: 2
    },
    body1: {
      fontSize: '1.25em',
      fontWeight: 500,
      fontFamily: ['Josefin Slab, serif'].join(','),
      letterSpacing: 2
    },
    body2: {
      fontSize: '1.25em',
      fontWeight: 300,
      fontFamily: ['Josefin Slab, serif'].join(','),
      letterSpacing: 2
    }
  },
  breakpoints: {
    values: {
      ml: 1720
    }
  }
})
