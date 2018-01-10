import React, {Component} from 'react'
import loadImage from 'blueimp-load-image'
import PropTypes from 'prop-types';

class AppolodoroUploadImage extends Component {  

  constructor(props){
    super(props)
    console.log(loadImage)
  }

  onClickUpload = () => {
    this.inputFile.click()
  }

  setRef = (element) => {
    this.inputFile = element
    this.inputFile.onchange = (e) => {
      const loadingImage = loadImage(
        e.target.files[0],
        (image, meta) => {
          this.onUpload(image)
        },
        {
          maxWidth: 640,
          minWidth: 480,
          meta : true,
          canvas: true,
          orientation : true
        }        
      )
    }        
  }

  onUpload = (image) =>{
    image.toBlob( (blob) => {
      this.props.onUpload(blob)
    })
  }

  render() {
    return <div>
      <input type="file" ref={ this.setRef } style={{display:'none'}} />
      <button onClick={ this.onClickUpload } >Upload</button>
    </div>
  }

}

AppolodoroUploadImage.propTypes = {
  onUpload : PropTypes.func,
  onError : PropTypes.func,
}

export default AppolodoroUploadImage;
