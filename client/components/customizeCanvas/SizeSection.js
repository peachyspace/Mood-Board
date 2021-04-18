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
  canvasFormat
}) => {
  const canvasPosts = [
    {
      id: 0,
      format: 'Regular Canvas Size',
      size: {
        height: 800,
        width: 800
      }
    },
    {
      id: 1,
      format: 'Pinterest Post Size',
      size: {
        width: 1000,
        height: 1000
      }
    },
    {
      id: 2,
      format: 'Instagram Potrait Size',
      size: {
        width: 1080,
        height: 1350
      }
    },
    {
      id: 3,
      format: 'Facebook Potrait Size',
      size: {
        width: 630,
        height: 1200
      }
    }
  ]
  const getFormat = format => {
    for (let i = 0; i <= canvasPosts.length - 1; i++) {
      if (canvasPosts[i].format === format) {
        return i
      }
    }
    return ''
  }
  let intialFormat
  if (canvasFormat) {
    intialFormat = canvasFormat
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
    canvas.calcOffset()
    canvas.renderAll()
    console.log(canvas)
  }

  return (
    <Grid>
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
  )
}

export default SizeSection
