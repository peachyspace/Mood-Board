import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import logo from '../../public/images/logo.png'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import respect from '../../public/images/respect.png'
import hello from '../../public/images/hello.png'
import fallInspiration from '../../public/images/fallInspiration.png'
import journey from '../../public/images/journey.png'
import roadTrip from '../../public/images/roadTrip.png'
import twoRoads from '../../public/images/twoRoads.png'
import beigePaper from '../../public/images/beigePaper.png'
import possible from '../../public/images/possible.png'
import summer from '../../public/images/summer.png'
import logoNote from '../../public/images/logoNote.png'
import pixabayPinkNote from '../../public/images/pixabayPinkNote.png'
import paintNote from '../../public/images/paintNote.png'
import Footer from './Footer'
import {Gradient} from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  container: {
    height: '100em',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-reapeat'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  gridList: {
    /* width: 1400, */
    width: 900,
    height: 360
  },
  subTitle: {
    textDecoration: 'none',
    fontFamily: 'Josefin Slab',
    fontWeight: 400,
    fontSize: '1.35em',
    letterSpacing: 2,
    color: 'black'
  },
  note: {
    width: '100%',
    maxWidth: '100%'
  }
}))
const Landing = () => {
  const classes = useStyles()
  const tileData = [
    {title: 'Respect', img: respect},
    {title: 'Hello', img: hello},
    {title: 'Fall Inspiration', img: fallInspiration},
    {title: 'Jorney', img: journey},
    {title: 'Road Trip', img: roadTrip},
    {title: 'Roads', img: twoRoads},
    {title: 'Summer', img: summer},
    {title: 'Possible', img: possible}
  ]

  return (
    <Grid
      container
      direction="row"
      style={{
        backgroundImage: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)'
      }}
    >
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{marginTop: '5em' /* , marginBottom: '-12em' */}}
      >
        <img src={logo} alt="logo" style={{width: '5.2em', height: '5.2em'}} />
        <Typography
          component="h1"
          variant="h1" /* style={{marginTop: '1em'}} */
        >
          Moodboard
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        style={
          {
            /*        marginTop: '2em',
          backgroundImage: `url(${beigePaper})`,
          height: '105em',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-reapeat' */
            /* backgroundColor: 'white',
          backgroundImage: 'linear-gradient(to bottom, white, #faecda, #e1bfad)' */
          }
        }
      >
        <Grid item container justify="center" alignContent="center">
          <Typography
            component="h4"
            variant="h4"
            style={{
              marginTop: '1em',
              marginBottom: '1em'
            }}
          >
            Our Users Creations:
          </Typography>
          <Grid
            item
            container
            alignContent="center"
            justify="center"
            style={{
              marginTop: '1em',
              justifyContent: 'center'
            }}
          >
            <div className={classes.root}>
              <GridList
                cellHeight={180}
                id="no-scroll1"
                className={classes.gridList}
                cols={3}
                style={{
                  justifyContent: 'center'
                }}
              >
                {tileData.map(tile => (
                  <GridListTile
                    key={tile.title}
                    style={{width: '40%', height: '100%'}}
                  >
                    <img src={tile.img} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Grid>
          <Grid
            container
            justify="center"
            style={{
              marginTop: '4em',
              marginBottom: '9em',
              width: '100%',
              flexWrap: 'nowrap'
            }}
          >
            <Grid items className="notesGrid">
              <img src={logoNote} alt="logoNote" />
              <div className="pinkNoteHolder">
                <img
                  src={pixabayPinkNote}
                  alt="pinkNote"
                  /* style={{marginLeft: '1em', marginRight: '1em'}} */
                />
              </div>

              <img src={paintNote} alt="paintNote" />
            </Grid>
          </Grid>
        </Grid>
        {/*         <Grid
          item
          container
          justify="center"
          style={{
            textAlign: 'center',
            marginTop: '6em'
          }}
        /> */}
      </Grid>
      <Footer />
    </Grid>
  )
}

export default Landing

// import React from 'react'
// import {makeStyles} from '@material-ui/core/styles'
// import logo from '../../public/images/logo.png'
// import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography'
// import GridList from '@material-ui/core/GridList'
// import GridListTile from '@material-ui/core/GridListTile'
// import respect from '../../public/images/respect.png'
// import hello from '../../public/images/hello.png'
// import fallInspiration from '../../public/images/fallInspiration.png'
// import journey from '../../public/images/journey.png'
// import roadTrip from '../../public/images/roadTrip.png'
// import twoRoads from '../../public/images/twoRoads.png'
// import beigePaper from '../../public/images/beigePaper.png'
// import possible from '../../public/images/possible.png'
// import summer from '../../public/images/summer.png'
// import logoNote from '../../public/images/logoNote.png'
// import pixabayPinkNote from '../../public/images/pixabayPinkNote.png'
// import paintNote from '../../public/images/paintNote.png'
// import Footer from './Footer'

// const useStyles = makeStyles(() => ({
//   container: {
//     height: '100em',
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-reapeat'
//   },
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     overflow: 'hidden'
//   },
//   gridList: {
//     width: 1400,
//     height: 560
//   },
//   subTitle: {
//     textDecoration: 'none',
//     fontFamily: 'Josefin Slab',
//     fontWeight: 400,
//     fontSize: '1.35em',
//     letterSpacing: 2,
//     color: 'black'
//   },
//   note: {
//     width: '100%',
//     maxWidth: '100%'
//   }
// }))
// const Landing = () => {
//   const classes = useStyles()
//   const tileData = [
//     {title: 'Respect', img: respect},
//     {title: 'Hello', img: hello},
//     {title: 'Fall Inspiration', img: fallInspiration},
//     {title: 'Jorney', img: journey},
//     {title: 'Road Trip', img: roadTrip},
//     {title: 'Roads', img: twoRoads},
//     {title: 'Summer', img: summer},
//     {title: 'Possible', img: possible}
//   ]

//   return (
//     <Grid container direction="column">
//       <Grid
//         item
//         container
//         direction="row"
//         justify="center"
//         alignItems='center'
//         style={{marginTop: '5em', marginBottom: '-12em'}}
//       >
//         <img src={logo} alt="logo" style={{width: '5.2em', height: '5.2em'}} />
//         <Typography component="h1" variant="h1" /* style={{marginTop: '1em'}} */>
//           Moodboard
//         </Typography>
//       </Grid>
//       <Grid
//         item
//         container
//         justify="center"
//         style={{
//           marginTop: '2em',
//           backgroundImage: `url(${beigePaper})`,
//           height: '105em',
//           backgroundPosition: 'center',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-reapeat'
//         }}
//       >
//         <Grid item container justify="center" alignContent="center">
//           <Typography
//             component="h4"
//             variant="h4"
//             style={{
//               marginTop: '6em',
//               marginBottom: '1em'
//             }}
//           >
//             Our Users Creations:
//           </Typography>
//           <Grid
//             item
//             container
//             alignContent="center"
//             justify="center"
//             style={{
//               marginTop: '1em',
//               justifyContent: 'center'
//             }}
//           >
//             <div className={classes.root}>
//               <GridList
//                 cellHeight={180}
//                 id="no-scroll1"
//                 className={classes.gridList}
//                 cols={3}
//                 style={{
//                   justifyContent: 'center'
//                 }}
//               >
//                 {tileData.map(tile => (
//                   <GridListTile
//                     key={tile.title}
//                     style={{width: '40%', height: '100%'}}
//                   >
//                     <img src={tile.img} />
//                   </GridListTile>
//                 ))}
//               </GridList>
//             </div>
//           </Grid>
//           <Grid
//             container
//             justify="center"
//             style={{
//               marginTop: '10em',
//               width: '30%',
//               flexWrap: 'nowrap'
//             }}
//           >
//             <Grid items>
//               <img src={logoNote} alt="logoNote" />
//               <img
//                 src={pixabayPinkNote}
//                 alt="pinkNote"
//                 style={{marginLeft: '1em', marginRight: '1em'}}
//               />
//               <img src={paintNote} alt="paintNote" />
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid
//           item
//           container
//           justify="center"
//           style={{
//             textAlign: 'center',
//             marginTop: '6em'
//           }}
//         />
//       </Grid>
//       <Footer />
//     </Grid>
//   )
// }

// export default Landing
