# appolodoro-uploadimage

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

```js

import React, {Component} from 'react'
import {render} from 'react-dom'

import AppolodoroUploadImage from '../../src'

class Demo extends Component {
  
  handleUpload = (imageData) => {
    this.image.src = imageData
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
      />
      <img ref={ this.setRef } />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))

```