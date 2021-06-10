import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import FontSection from './customizeCanvas/FontSection'
import BackgroundSection from './customizeCanvas/BackgroundSection'
import SizeSection from './customizeCanvas/SizeSection'
import UnsplashSection from './customizeCanvas/UnsplashSection'
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

const EditCustomTab = ({canvas, canvasBC, setFormat, canvasFormat}) => {
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
      <Container>
        <div className={classes.root}>
          <AppBar position="static" color="secondary">
            <Tabs
              indicatorColor="primary"
              value={tabValue}
              onChange={handleTabChange}
              aria-label="styledTabs example"
            >
              <Tab label="Background" />
              <Tab label="Font" />
              <Tab label="Size" />
              {/* <Tab label="Unsplash" /> */}
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
                {hasCanvas > 0 ? <FontSection canvas={canvas} /> : null}
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
                    canvasFormat={canvasFormat}
                  />
                ) : null}
              </Box>
            )}
          </div>
          {/* <div
            role="tabpanel"
            hidden={3 !== displayValue}
            id={`simple-tabpanel-${displayValue}`}
            aria-labelledby={`simple-tab-${displayValue}`}
            value={tabValue}
            index={3}
          >
            {tabValue === displayValue && (
              <Box p={3}>
                {hasCanvas > 0 ? <UnsplashSection canvas={canvas} /> : null}
              </Box>
            )}
          </div> */}
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
