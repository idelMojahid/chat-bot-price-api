var request = require('request');

getMeanPrice = function(query){
    return new Promise(
        function (resolve, reject) {
            if(query){
                let query_form = {
                    query:query,
                    p:1,
                    hasMapItems:true,
                    suggest:false,
                    firstPageCount:20
                };   
                request.post({
                    url:     'http://vendo.ma/search/searchOffers',
                    form:    query_form
                  },function(err, res, body) 
                {
                    let resp_offers = JSON.parse(body);
                    resolve(resp_offers.offers)
                });
            }else{
                let response = {found : false}
                reject(response);
            }  

            });
}
module.exports = {
    getMeanPrice
}