import React from 'react'
import {ThemeProvider} from '@material-ui/styles'
import theme from './components/theme'
import {BrowserRouter, Switch} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
