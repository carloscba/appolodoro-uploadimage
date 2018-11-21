import React, { Component } from 'react'
import loadImage from 'blueimp-load-image'
import PropTypes from 'prop-types';
import smartcrop from 'smartcrop'
import axios from 'axios'

class AppolodoroUploadImage extends Component {

  constructor(props) {
    super(props)
  }

  onClickUpload = () => {
    this.inputFile.click()
  }

  setRef = (element) => {
    this.inputFile = element
    this.props.setUploader(this.inputFile)
  }

  handleChange = (event) => {
    const loadingImage = loadImage(
      event.target.files[0],
      (image, meta) => {
        this.onUpload(image)
      },
      {
        maxWidth: this.props.size[0],
        minHeight: this.props.size[1],
        meta: true,
        canvas: true,
        orientation: true
      }
    )
  }

  onUpload = (canvas) => {
    const image = canvas.toDataURL("image/jpeg", 1)

    if (this.props.smartcrop) {
      this.requestVision(canvas, image)
      //this.smartcrop(canvas)
    } else {
      this.props.onUpload(image, null)
    }
  }

  requestVision = (canvas, image) => {
    const requestData = {
      "requests": [
        {
          "image": {
            "content": `${image.split(',')[1]}`
          },
          "features": [
            {
              "type": "CROP_HINTS",
            }
          ],
          "imageContext": {
            "cropHintsParams": {
              "aspectRatios": [(this.props.size[0] / this.props.size[1])]
            }
          }
        }
      ]
    }

    axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${this.props.vision_key}`,
      requestData
    ).then((response) => {
      this.smartcrop(canvas, response)
    }).catch((error) => {
      console.log(error)
    });

  }

  smartcrop = (canvas, visionResponse) => {
    const HORIZONTAL = 'horizontal'
    const VERTICAL = 'vertical'

    const visionData = visionResponse.data.responses
    const vertices = visionData[0].cropHintsAnnotation.cropHints[0].boundingPoly.vertices

    let direction = null
    if (vertices[0].x) {
      direction = HORIZONTAL
    }
    if (vertices[0].y) {
      direction = VERTICAL
    }

    const cropSource = canvas.getContext('2d');
    let cropData;

    switch (direction) {
      case HORIZONTAL:
        cropData = cropSource.getImageData(vertices[0].x, 0, (vertices[1].x - vertices[0].x), vertices[2].y)
        break
      case VERTICAL:
        cropData = cropSource.getImageData(0, vertices[0].y, vertices[1].x, (vertices[3].y - vertices[0].y))
        break
      default:
        cropData = cropSource.getImageData(0, 0, vertices[2].x, vertices[2].y)
        break
    }

    const canvasResult = this.refs.canvasResult
    canvasResult.width = cropData.width
    canvasResult.height = cropData.height

    const cropResult = canvasResult.getContext("2d");
    cropResult.putImageData(cropData, 0, 0);

    this.props.onUpload(cropResult.canvas.toDataURL("image/jpeg", 1), visionResponse)

  }

  render() {
    return <div className='UploadImage'>
      <input type="file" accept={this.props.accept} ref={this.setRef} style={{ display: 'none' }} onChange={this.handleChange} />
      <div className='UploadImage__button' onClick={this.onClickUpload} >Upload</div>
      <canvas ref="canvasResult"></canvas>
    </div>
  }

}

AppolodoroUploadImage.propTypes = {
  onUpload: PropTypes.func,
  onError: PropTypes.func,
  setUploader: PropTypes.func,
  smartcrop: PropTypes.bool,
  size: PropTypes.array.isRequired,
  accept: PropTypes.string,
  vision_key: PropTypes.string.isRequired
}

AppolodoroUploadImage.defaultProps = {
  smartcrop: false,
  accept: 'image/*'
}


export default AppolodoroUploadImage;
