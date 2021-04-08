import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
//import {Button, Grid} from '@material-ui/core'
import FontSection from './customizeCanvas/FontSection'
import BackgroundSection from './customizeCanvas/BackgroundSection'
import SizeSection from './customizeCanvas/SizeSection'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 50
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '80%',
    marginTop: theme.spacing(1)
  },
  formContainer: {
    marginTop: 20
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  failedSubmit: {
    color: 'red'
  },
  root: {
    /*   flexGrow: 1, */
    backgroundColor: theme.palette.common.colorFive
  }
}))

const EditCustomTab = ({canvas, canvasBC, setFormat, canvasFormat}) => {
  const classes = useStyles()
  //const theme = useTheme()
  //const [canvas, setUserCanvas] = useState({})
  const [tabValue, setTabValue] = useState(0)
  const [displayValue, setDisplayValue] = useState(0)

  console.log(canvas)

  const handleTabChange = (event, value) => {
    setTabValue(value)
    setDisplayValue(value)
  }

  /*  const handleTabIndexChange = (event, index)=>{
        setTabValue(index)
        setDisplayValue(index)
        
    } */

  let canvasKeys = Object.keys(canvas)
  let hasCanvas = canvas && canvasKeys.length
  console.log(hasCanvas)

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
                <Typography>Item one</Typography>
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
            /* dir={theme.direction} */
          >
            {tabValue === displayValue && (
              <Box p={3}>
                <Typography>Item two</Typography>
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
                <Typography>Item three</Typography>
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
        </div>
      </Container>
    </div>
  )
}

export default EditCustomTab
