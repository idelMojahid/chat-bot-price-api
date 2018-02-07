var request = require('request');
var rp = require('request-promise');
var calculService = require('../services/calcul')
getMeanPrice = (query)=>{
    return new Promise(
        function (resolve, reject) {
            getPricesVendo(query).then((data)=>{
                //console.log(calculService.meanPrices(data.prices_filtred))
                resolve(calculService.meanPrices(data.prices_filtred));
            })
        })
    
}
getPricesVendo = (query)=>{
    let query_form = (query , page =1)=> {
        return {query:query,
        p:page,
        hasMapItems:true,
        suggest:false,
        firstPageCount:20};
    }; 
    let options = (query,page)=>{
        return {
            method: 'POST',
            uri: 'http://vendo.ma/search/searchOffers',
            body: query_form(query,page),
            json: true ,// Automatically stringifies the body to JSON
            family : 4
        };
    };
    let prices = [];
    return new Promise(
        function (resolve, reject) {
            rp(options(query,1)).then((data)=>{
                prices = prices.concat(data.offers.map((e)=>{
                    return e.price
                }));
                rp(options(query,2)).then((data)=>{
                    prices = prices.concat(data.offers.map((e)=>{
                        return e.price
                    }));
                    rp(options(query,3)).then((data)=>{
                        prices = prices.concat(data.offers.map((e)=>{
                            return e.price
                        }));
                        rp(options(query,4)).then((data)=>{
                            prices = prices.concat(data.offers.map((e)=>{
                                return e.price
                            }));
                        }).then(()=>{
                            let query_price = {provider : 'vendo' ,query : query ,prices : prices, prices_filtred : calculService.filterOutliers(prices)}
                            resolve(query_price)
                        })
                    })
                })
            });
        });
    
}
module.exports = {
    getMeanPrice
}