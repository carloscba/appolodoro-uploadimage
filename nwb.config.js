module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'AppolodoroUploadImage',
      externals: {
        react: 'React'
      }
    }
  }
}
