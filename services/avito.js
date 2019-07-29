
var request = require('request');
var rp = require('request-promise');
var calculService = require('../services/calcul')

getMeanPrice = (query)=>{
    return new Promise(
        (resolve,reject)=>{
            getPricesAvito(query).then((data)=>{
                resolve(calculService.meanPrices(data.prices_filtred));
            })
            //resolve("test");
        }    
    )
    
}
getPricesAvito = (query)=>{
    let query_form = (query , page =1)=> {
        return {query:query,
        p:page,
        hasMapItems:true,
        suggest:false,
        firstPageCount:20};
    }; 
    let options = (query,page)=>{
        return {
            method: 'GET',
            uri: `https://www.avito.ma/lij?o=${page}&q=${query}`,
            json: true ,// Automatically stringifies the body to JSON
            family : 4
        };
    };
    let prices = [];
    return new Promise(
        function (resolve, reject) {
            rp(options(query,1)).then((data)=>{
                prices = prices.concat(data.list_ads.map((e)=>{
                    if(e.price){
                        let price = e.price
                        price = price.replace('.','');
                        return parseFloat(price);
                    }
                }));
                rp(options(query,2)).then((data)=>{
                    prices = prices.concat(data.list_ads.map((e)=>{
                        if(e.price){
                            let price = e.price
                            price = price.replace('.','');
                            return parseFloat(price);
                        }
                    }));
                    rp(options(query,3)).then((data)=>{
                        prices = prices.concat(data.list_ads.map((e)=>{
                            if(e.price){
                                let price = e.price
                                price = price.replace('.','');
                                return parseFloat(price);
                            }
                            
                        }));
                        rp(options(query,4)).then((data)=>{
                            prices = prices.concat(data.list_ads.map((e)=>{
                                if(e.price){
                                    let price = e.price
                                    price = price.replace('.','');
                                    return parseFloat(price);
                                }
                            }));
                        }).then(()=>{
                            let query_price = {provider : 'avito',query : query ,prices : prices, prices_filtred : calculService.filterOutliers(prices)}
                            resolve(query_price);
                        })
                    })
                })
            });
        });
    
}
module.exports = {
    getMeanPrice
}