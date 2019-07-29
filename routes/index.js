var express = require('express');
var avitoService = require('../services/avito')
var vendoService = require('../services/vendo')
var router = express.Router();
var calculService = require('../services/calcul')
var package_json = require('../package.json');
var rp = require('request-promise');
router.get('/', (req, res) => {
    res.send({project : package_json.name,version : package_json.version});   
    
});
/**
 * Avito endpoints
 */
router.get('/avito/:query?', (req, res) => {
    let query = req.params.query;
    let price_query = {query : query}
    avitoService.getMeanPrice(query).then((data)=>{
        price_query['mean_price'] = parseInt(data)
        res.send(price_query);
    });
});

/**
 * Vendo endpoints
 */
router.get('/vendo/:query?',(req, res)=>{
    let query = req.params.query;
    let price_query = {query : query}
    vendoService.getMeanPrice(query).then((data)=>{
        price_query['mean_price'] = data
        res.send(price_query);
    }).catch((err)=>{
        res.send(err);
    });
});
module.exports = router;
