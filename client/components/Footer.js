import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import linkedinLogo from '../../public/images/linkedinLogo.png'

const useStyles = makeStyles(() => ({
  footBox: {
    backgroundColor: '#C3A789'
  },
  link: {
    textDecoration: 'none',
    fontFamily: 'Josefin Slab',
    fontWeight: 400,
    fontSize: '1.35em',
    letterSpacing: 2,
    color: 'black',
    textAlign: 'center'
  }
}))

const Footer = () => {
  let classes = useStyles()

  return (
    <Grid container justify="center" className={classes.footBox}>
      <Grid item container justify="center" direction="row">
        <Grid item component="a" className={classes.link}>
          <Typography>Let's Connect On</Typography>
        </Grid>
        <Grid
          item
          component="a"
          href="https://www.linkedin.com/in/priscila-pintado/"
          rel="noopener noreferrer"
          target="_blank"
          className={classes.link}
        >
          <img
            src={linkedinLogo}
            alt="instagram icon"
            style={{width: 40, height: 40, marginLeft: '0.4em'}}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Footer
