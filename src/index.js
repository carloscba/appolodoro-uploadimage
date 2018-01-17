import React, {Component} from 'react'
import loadImage from 'blueimp-load-image'
import PropTypes from 'prop-types';

class AppolodoroUploadImage extends Component {  

  constructor(props){
    super(props)
  }

  onClickUpload = () => {
    this.inputFile.click()
  }
  
  setRef = (element) => {
    this.inputFile = element
    this.props.setRef(this.inputFile)
  }

  handleChange = (event) => {
    const loadingImage = loadImage(
        event.target.files[0],
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

  onUpload = (canvas) =>{
    this.props.onUpload(canvas.toDataURL("image/jpeg", 1))
  }

  render() {
    return <div className='UploadImage'>
      <input type="file" ref={ this.setRef } style={{display:'none'}} onChange = { this.handleChange } />
      <div className='UploadImage__button' onClick={ this.onClickUpload } >Upload</div>
    </div>
  }

}
/*
const styles = {
  container : {
    display : 'inline-block'
  },
  button : {
    display: 'inline-block',
    border: '1px solid #000000',
    padding: '10px',
    backgroundColor: '#C3C3C3',
    color: 'white',
    cursor: 'pointer'
  }
}
*/
AppolodoroUploadImage.propTypes = {
  onUpload : PropTypes.func,
  onError : PropTypes.func,
  setRef: PropTypes.func,
}

AppolodoroUploadImage.defaultProps = {
  //styles
}


export default AppolodoroUploadImage;
