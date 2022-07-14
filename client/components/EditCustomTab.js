import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextSection from './customizeCanvas/TextSection'
import BackgroundSection from './customizeCanvas/BackgroundSection'
import SizeSection from './customizeCanvas/SizeSection'
import PixabaySection from './customizeCanvas/PixabaySection'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.colorFive
  }
}))

const EditCustomTab = ({
  canvas,
  canvasBC,
  setFormat,
  storedFormat,
  zoomValue
}) => {
  const classes = useStyles()
  const [tabValue, setTabValue] = useState(0)
  const [displayValue, setDisplayValue] = useState(0)
  const handleTabChange = (event, value) => {
    setTabValue(value)
    setDisplayValue(value)
  }

  let canvasKeys = Object.keys(canvas)
  let hasCanvas = canvas && canvasKeys.length

  return (
    <div>
      <Container style={{marginTop: '1em', maxWidth: 'fit-content'}}>
        <div className={classes.root}>
          <AppBar position="static" color="secondary">
            <Tabs
              indicatorColor="primary"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="styledTabs example"
            >
              <Tab label="Background" />
              <Tab label="Text" />
              <Tab label="Size" />
              <Tab label="Pixabay" />
            </Tabs>
          </AppBar>

          <div
            role="tabpanel"
            hidden={0 !== displayValue}
            id={`simple-tabpanel-${displayValue}`}
            aria-labelledby={`simple-tab-${displayValue}`}
            value={tabValue}
            index={0}
          >
            {tabValue === displayValue && (
              <Box p={3}>
                {hasCanvas > 0 ? (
                  <BackgroundSection canvas={canvas} canvasBC={canvasBC} />
                ) : null}
              </Box>
            )}
          </div>
          <div
            role="tabpanel"
            hidden={1 !== displayValue}
            id={`simple-tabpanel-${displayValue}`}
            aria-labelledby={`simple-tab-${displayValue}`}
            value={tabValue}
            index={1}
          >
            {tabValue === displayValue && (
              <Box p={3}>
                {hasCanvas > 0 ? <TextSection canvas={canvas} /> : null}
              </Box>
            )}
          </div>
          <div
            role="tabpanel"
            hidden={2 !== displayValue}
            id={`simple-tabpanel-${displayValue}`}
            aria-labelledby={`simple-tab-${displayValue}`}
            value={tabValue}
            index={2}
          >
            {tabValue === displayValue && (
              <Box p={3}>
                {hasCanvas > 0 ? (
                  <SizeSection
                    canvas={canvas}
                    setFormat={setFormat}
                    storedFormat={storedFormat}
                    zoomValue={zoomValue}
                  />
                ) : null}
              </Box>
            )}
          </div>
          <div
            role="tabpanel"
            hidden={3 !== displayValue}
            id={`simple-tabpanel-${displayValue}`}
            aria-labelledby={`simple-tab-${displayValue}`}
            value={tabValue}
            index={3}
          >
            {tabValue === displayValue && (
              <Box p={3}>
                <Typography style={{textAlign: 'center'}}>
                  Choose an image from Pixabay to download
                </Typography>
                {hasCanvas > 0 ? <PixabaySection /> : null}
              </Box>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default EditCustomTab
