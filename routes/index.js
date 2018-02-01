var express = require('express');
//var extractor = require('node-metainspector');
var avitoService = require('../services/avito')
var router = express.Router();

router.get('/', (req, res) => {
    avitoService.getMeanPrice('mercedes AMG').then((data)=>{
        res.send(data);
    });
});
module.exports = router;
