var request = require('request');

hello = function(){
    let query = 'samsung' ;
    let prices = [];
    let url_query = 'https://www.avito.ma/lij?q='+query+'&o='+1;
    let promise = getADs(url_query).then((data)=>{
        data.forEach(element => {
            prices.push(element.price);
        });
    }).then(()=> {return prices});
    
    
}
getADs = function(url_query) {
    return new Promise(
        function (resolve, reject) {
            request(url_query, function (error, response, body) {
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                let data = JSON.parse(body)
                resolve(data.list_ads);
              });  
            });
}
module.exports = {
    getADs,hello
}