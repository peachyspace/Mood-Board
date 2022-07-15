import React from 'react'
import {ThemeProvider} from '@material-ui/styles'
import theme from './components/theme'
import {BrowserRouter} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
import Footer from './components/Footer'
const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="pageContainer">
          <div className="contentWrap">
            <BrowserRouter>
              <Navbar />
              <Routes />
            </BrowserRouter>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
