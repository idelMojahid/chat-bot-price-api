var express = require('express');
//var extractor = require('node-metainspector');
var avitoService = require('../services/avito')
var vendoService = require('../services/vendo')
var router = express.Router();
router.get('/', (req, res) => {
    res.send({project:'ChatbotPrice',version:'0.0.1'});
});
/**
 * Avito endpoints
 */
router.get('/avito/:query?', (req, res) => {
    let query = req.params.query
    avitoService.getMeanPrice(query).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err);
    });
});

/**
 * Vendo Endpoint
 */
router.get('/vendo/:query?',(req, res)=>{
    let query = req.params.query;
    vendoService.getMeanPrice(query).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err);
    });
});
module.exports = router;
