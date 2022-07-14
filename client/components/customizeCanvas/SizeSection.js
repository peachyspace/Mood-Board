import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography'
import {Grid} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'

const SizeSection = ({
  canvas,
  create,
  setFormat,
  createFormat,
  setCreateHeight,
  setCreateWidth,
  storedFormat,
  zoomValue,
  setZoomValue
}) => {
  const canvasPosts = [
    {
      id: 0,
      format: 'Spotify Playlist Cover',
      size: {
        height: 300,
        width: 300
      }
    },
    {
      id: 1,
      format: 'Regular Canvas Size',
      size: {
        height: 800,
        width: 800
      }
    },
    {
      id: 2,
      format: 'Pinterest Post Size',
      size: {
        width: 1000,
        height: 1000
      }
    },
    {
      id: 3,
      format: 'Instagram Potrait Size',
      size: {
        width: 1080,
        height: 1350
      }
    },
    {
      id: 4,
      format: 'Facebook Potrait Size',
      size: {
        width: 630,
        height: 1200
      }
    },
    {
      id: 5,
      format: 'iPhone 6/6s/7/8 ',
      size: {
        width: 375,
        height: 667
      }
    },
    {
      id: 6,
      format: 'iPhone 6/6s/7/8 Plus',
      size: {
        width: 414,
        height: 736
      }
    },
    {
      id: 7,
      format: 'iPhone SE (2020)',
      size: {
        width: 375,
        height: 667
      }
    },
    {
      id: 8,
      format: 'iPhone X',
      size: {
        width: 375,
        height: 812
      }
    },
    {
      id: 9,
      format: 'iPhone XS',
      size: {
        width: 375,
        height: 812
      }
    },
    {
      id: 10,
      format: 'iPhone XS Max',
      size: {
        width: 414,
        height: 896
      }
    },
    {
      id: 11,
      format: 'iPhone XR',
      size: {
        width: 414,
        height: 896
      }
    },
    {
      id: 12,
      format: 'iPhone 11',
      size: {
        width: 414,
        height: 896
      }
    },
    {
      id: 13,
      format: 'iPhone 11 Pro',
      size: {
        width: 375,
        height: 812
      }
    },
    {
      id: 14,
      format: 'iPhone 11 Pro Max',
      size: {
        width: 414,
        height: 896
      }
    },
    {
      id: 15,
      format: 'iPhone 12/13',
      size: {
        width: 390,
        height: 844
      }
    },
    {
      id: 16,
      format: 'iPhone 12/13 Pro',
      size: {
        width: 390,
        height: 844
      }
    },
    {
      id: 17,
      format: 'iPhone 12/13 Pro Max',
      size: {
        width: 428,
        height: 926
      }
    },
    {
      id: 18,
      format: 'Samsung Galaxy S7',
      size: {
        width: 360,
        height: 640
      }
    },
    {
      id: 19,
      format: 'Samsung Galaxy S8/8+/9/9+',
      size: {
        width: 360,
        height: 740
      }
    },
    {
      id: 20,
      format: 'Samsung Galaxy S10',
      size: {
        width: 360,
        height: 760
      }
    },
    {
      id: 21,
      format: 'Samsung Galaxy S10+',
      size: {
        width: 412,
        height: 869
      }
    },
    {
      id: 22,
      format: 'Samsung Galaxy S20',
      size: {
        width: 360,
        height: 800
      }
    },
    {
      id: 23,
      format: 'Samsung Galaxy S20+',
      size: {
        width: 384,
        height: 854
      }
    },
    {
      id: 24,
      format: 'Samsung Galaxy S20 Ultra',
      size: {
        width: 412,
        height: 915
      }
    },
    {
      id: 25,
      format: 'Samsung Galaxy S21 Ultra',
      size: {
        width: 384,
        height: 854
      }
    },
    {
      id: 26,
      format: 'Google Pixel 4',
      size: {
        width: 393,
        height: 830
      }
    },
    {
      id: 27,
      format: 'Google Pixel 4 XL',
      size: {
        width: 412,
        height: 869
      }
    },
    {
      id: 28,
      format: 'Google Pixel 4a/5',
      size: {
        width: 393,
        height: 851
      }
    }
  ]

  const dontApply = {
    'Spotify Playlist Cover': true,
    'Regular Canvas Size': true,
    'iPhone 6/6s/7/8 ': true,
    'iPhone SE (2020)': true,
    'Samsung Galaxy S7': true
  }
  const biggestSizes = {
    'Instagram Potrait Size': true,
    'Facebook Potrait Size': true
  }
  const getFormat = format => {
    for (let i = 0; i <= canvasPosts.length - 1; i++) {
      if (canvasPosts[i].format === format) {
        return i
      }
    }
    return ''
  }
  let intialFormat
  if (storedFormat) {
    intialFormat = storedFormat
  } else {
    intialFormat = createFormat
  }

  const [selectedSize, setSelectedSize] = useState(
    canvasPosts[getFormat(intialFormat)]
  )

  const getPostSizeId = id => {
    for (let i = 0; i <= canvasPosts.length - 1; i++) {
      if (canvasPosts[i].id === id) {
        return id
      }
    }
    return ''
  }

  const handleSizeChange = event => {
    setSelectedSize(event.target.value)
    setFormat(event.target.value.format)
    canvas.setDimensions(event.target.value.size)
    if (create) {
      setCreateHeight(event.target.value.size.height)
      setCreateWidth(event.target.value.size.width)
    }
    // canvas.calcOffset()
    // canvas.renderAll()

    if (!(event.target.value.format in dontApply) && zoomValue === 25) {
      if (event.target.value.format in biggestSizes) {
        document.getElementById('canvasHolder').style.marginTop = '-27em'
        document.getElementById('canvasHolder').style.marginBottom = '-28em'
      } else {
        document.getElementById('canvasHolder').style.marginTop = '-17em'
        document.getElementById('canvasHolder').style.marginBottom = '-18em'
      }
    } else if (!(event.target.value.format in dontApply) && zoomValue === 50) {
      if (!(event.target.value.format in biggestSizes)) {
        document.getElementById('canvasHolder').style.marginTop = '-11em'
        document.getElementById('canvasHolder').style.marginBottom = '-11em'
      } else {
        document.getElementById('canvasHolder').style.marginTop = '-17em'
        document.getElementById('canvasHolder').style.marginBottom = '-17em'
      }
    } else if (!(event.target.value.format in dontApply) && zoomValue === 75) {
      if (!(event.target.value.format in biggestSizes)) {
        document.getElementById('canvasHolder').style.marginTop = '-5em'
        document.getElementById('canvasHolder').style.marginBottom = '-7em'
      } else {
        document.getElementById('canvasHolder').style.marginTop = '-8em'
        document.getElementById('canvasHolder').style.marginBottom = '-8em'
      }
    } else if (!(event.target.value.format in dontApply) && zoomValue === 100) {
      document.getElementById('canvasHolder').style.marginTop = '0em'
      document.getElementById('canvasHolder').style.marginBottom = '0em'
    } else if (
      event.target.value.format !== 'Spotify Playlist Cover' &&
      event.target.value.format in dontApply &&
      zoomValue === 25
    ) {
      document.getElementById('canvasHolder').style.marginTop = '-13em'
      document.getElementById('canvasHolder').style.marginBottom = '-13em'
    } else if (
      event.target.value.format !== 'Spotify Playlist Cover' &&
      event.target.value.format in dontApply &&
      zoomValue === 50
    ) {
      document.getElementById('canvasHolder').style.marginTop = '-8em'
      document.getElementById('canvasHolder').style.marginBottom = '-10em'
    } else if (
      event.target.value.format !== 'Spotify Playlist Cover' &&
      event.target.value.format in dontApply &&
      zoomValue === 75
    ) {
      document.getElementById('canvasHolder').style.marginTop = '-4em'
      document.getElementById('canvasHolder').style.marginBottom = '-6em'
    } else {
      document.getElementById('canvasHolder').style.marginTop = '0em'
      document.getElementById('canvasHolder').style.marginBottom = '0em'
    }
    canvas.calcOffset()
    canvas.renderAll()
  }

  return (
    <Grid container justify="center">
      <Grid item>
        <FormControl>
          <Select
            value={canvasPosts[getPostSizeId(selectedSize.id)]}
            onChange={handleSizeChange}
          >
            {canvasPosts.map(canvasPost => (
              <MenuItem key={canvasPost.id} value={canvasPost}>
                <Typography component="h5" variant="h5">
                  {canvasPost.format}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default SizeSection

// const canvasPosts = [
//   {
//     id: 0,
// /*       format: 'Regular Canvas Size', */
//     format: 'Spotify Playlist Cover',
//     size: {
// /*         height: 800,
//       width: 800 */
//       height: 300,
//       width: 300
//     }
//   },
//   {
//     id: 1,
//     format: 'Pinterest Post Size',
//     size: {
//       width: 1000,
//       height: 1000
//     }
//   },
//   {
//     id: 2,
//     format: 'Instagram Potrait Size',
//     size: {
//       width: 1080,
//       height: 1350
//     }
//   },
//   {
//     id: 3,
//     format: 'Facebook Potrait Size',
//     size: {
//       width: 630,
//       height: 1200
//     }
//   },
//   {
//     id: 4,
//     format: 'iPhone 6/6s/7/8 ',
//     size: {
//       width: 375,
//       height: 667
//     }
//   },
//   {
//     id: 5,
//     format: 'iPhone 6/6s/7/8 Plus',
//     size: {
//       width: 414,
//       height: 736
//     }
//   },
//   {
//     id: 6,
//     format: 'iPhone SE (2020)',
//     size: {
//       width: 375,
//       height: 667
//     }
//   },
//   {
//     id: 7,
//     format: 'iPhone X',
//     size: {
//       width: 375,
//       height: 812
//     }
//   },
//   {
//     id: 8,
//     format: 'iPhone XS',
//     size: {
//       width: 375,
//       height: 812
//     }
//   },
//   {
//     id: 9,
//     format: 'iPhone XS Max',
//     size: {
//       width: 414,
//       height: 896
//     }
//   },
//   {
//     id: 10,
//     format: 'iPhone XR',
//     size: {
//       width: 414,
//       height: 896
//     }
//   },
//   {
//     id: 11,
//     format: 'iPhone 11',
//     size: {
//       width: 414,
//       height: 896
//     }
//   },
//   {
//     id: 12,
//     format: 'iPhone 11 Pro',
//     size: {
//       width: 375,
//       height: 812
//     }
//   },
//   {
//     id: 13,
//     format: 'iPhone 11 Pro Max',
//     size: {
//       width: 414,
//       height: 896
//     }
//   },
//   {
//     id: 14,
//     format: 'iPhone 12',
//     size: {
//       width: 390,
//       height: 844
//     }
//   },
//   {
//     id: 15,
//     format: 'iPhone 12 Pro',
//     size: {
//       width: 390,
//       height: 844
//     }
//   },
//   {
//     id: 16,
//     format: 'iPhone 12 Pro Max',
//     size: {
//       width: 428,
//       height: 926
//     }
//   },
//   {
//     id: 17,
//     format: 'Samsung Galaxy S7',
//     size: {
//       width: 360,
//       height: 640
//     }
//   },
//   {
//     id: 18,
//     format: 'Samsung Galaxy S8/8+/9/9+',
//     size: {
//       width: 360,
//       height: 740
//     }
//   },
//   {
//     id: 19,
//     format: 'Samsung Galaxy S10',
//     size: {
//       width: 360,
//       height: 760
//     }
//   },
//   {
//     id: 20,
//     format: 'Samsung Galaxy S10+',
//     size: {
//       width: 412,
//       height: 869
//     }
//   },
//   {
//     id: 21,
//     format: 'Samsung Galaxy S20',
//     size: {
//       width: 360,
//       height: 800
//     }
//   },
//   {
//     id: 22,
//     format: 'Samsung Galaxy S20+',
//     size: {
//       width: 384,
//       height: 854
//     }
//   },
//   {
//     id: 23,
//     format: 'Samsung Galaxy S20 Ultra',
//     size: {
//       width: 412,
//       height: 915
//     }
//   },
//   {
//     id: 24,
//     format: 'Samsung Galaxy S21 Ultra',
//     size: {
//       width: 384,
//       height: 854
//     }
//   },
//   {
//     id: 25,
//     format: 'Google Pixel 4',
//     size: {
//       width: 393,
//       height: 830
//     }
//   },
//   {
//     id: 26,
//     format: 'Google Pixel 4 XL',
//     size: {
//       width: 412,
//       height: 869
//     }
//   },
//   {
//     id: 27,
//     format: 'Google Pixel 4a/5',
//     size: {
//       width: 393,
//       height: 851
//     }
//   }
// ]
