import React from 'react'
import {ThemeProvider} from '@material-ui/styles'
import theme from './components/theme'
import {BrowserRouter, Switch} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          {' '}
          <BrowserRouter>
            <Navbar />
            <Routes />
          </BrowserRouter>
        </DndProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
