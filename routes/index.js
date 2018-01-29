var express = require('express');
//var extractor = require('node-metainspector');
var avitoService = require('../services/avito')
var router = express.Router();
router.get('/', (req, res) => {
    // avitoService.getADs('https://www.avito.ma/lij?o=2&q=iphone&mpr=2500&ca=5').then((data)=>{
    //     res.send(data);
    // });
    ;
    res.send(avitoService.hello());
})
module.exports = router;
