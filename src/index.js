import React, {Component} from 'react'
import loadImage from 'blueimp-load-image'
import PropTypes from 'prop-types';
import smartcrop from 'smartcrop'

class AppolodoroUploadImage extends Component {  

  constructor(props){
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
          meta : true,
          canvas: true,
          orientation : true
        }        
      )
  }

  onUpload = (canvas) =>{
    const image = canvas.toDataURL("image/jpeg", 1)

    if(this.props.smartcrop){
      smartcrop.crop(canvas).then((result) => {
        this.props.onUpload(image, result)
      });
    }else{
      this.props.onUpload(image, null)
    }    
  }

  render() {
    return <div className='UploadImage'>
      <input type="file" accept={ this.props.accept } ref={ this.setRef } style={{display:'none'}} onChange = { this.handleChange } />
      <div className='UploadImage__button' onClick={ this.onClickUpload } >Upload</div>
    </div>
  }

}

AppolodoroUploadImage.propTypes = {
  onUpload : PropTypes.func,
  onError : PropTypes.func,
  setUploader: PropTypes.func,
  smartcrop: PropTypes.bool,
  size: PropTypes.array.isRequired,
  accept : PropTypes.string
}

AppolodoroUploadImage.defaultProps = {
  smartcrop : false,
  accept : 'image/*'
}


export default AppolodoroUploadImage;
