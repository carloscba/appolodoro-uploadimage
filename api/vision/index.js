const express = require('express')
const axios = require('axios')
const api = express.Router()
var url = require('url');

const onError = (res, error) => {
    res.json({
        success : false
    })
}

api.post('/crop', (req, res, next) => {
    try{
        axios.post(
            'https://vision.googleapis.com/v1/images:annotate?key=XXXXXX', 
            req.body
        ).then( (response) => {
            res.json(response.data)
        }).catch( (error) => {
            onError(res, error)
        });

    }catch(error){
        onError(res, error)
    }
     

})

module.exports = api