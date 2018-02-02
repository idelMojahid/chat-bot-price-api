var express = require('express');
//var extractor = require('node-metainspector');
var avitoService = require('../services/avito')
var router = express.Router();
router.get('/', (req, res) => {
    res.send({project:'ChatbotPrice',version:'0.0.1'});
});
router.get('/avito/:query?', (req, res) => {
    let query = req.params.query
    avitoService.getMeanPrice(query).then((data)=>{
        res.send(data);
    });
});
module.exports = router;
