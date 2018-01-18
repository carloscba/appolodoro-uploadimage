import React, {Component} from 'react'
import {render} from 'react-dom'

import AppolodoroUploadImage from '../../src'

class Demo extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      width : 0,
      height : 0,
      top: 0,
      left: 0
    }
  }

  handleUpload = (imageData, cropData) => {
    this.image.src = imageData
    if(cropData){
      this.setState({
        width : cropData.topCrop.width,
        height : cropData.topCrop.height,
        top : cropData.topCrop.x,
        left : cropData.topCrop.y
      })
    }
    console.log('cropData', cropData)
  }

  setRef = (element) => {
    this.image = element
  }

  setUploader = (element) => {
    this.uploader = element
  }

  openFile = () => {
    this.uploader.click()
  }

  render() {
    return <div>
      <button 
      onClick={ this.openFile }>Open file</button>
      <hr/>
      <AppolodoroUploadImage 
      onUpload = { this.handleUpload } 
      setRef={ this.setUploader }
      size = { [600,315] }
      />
      <div style={ { position : 'absolute' }}>
        <div style={ {
          position: 'absolute',
          border: '1px solid #000000',
          width: this.state.width,
          height: this.state.height,
          top: this.state.top,
          left: this.state.left
        }}></div>
        <img ref={ this.setRef } />
      </div>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
