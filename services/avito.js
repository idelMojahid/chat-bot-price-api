var request = require('request');
var spawn = require("child_process").spawn;

getMeanPrice = function(query){
    return new Promise(
        function (resolve, reject) {
            if(query){
                const pyProg = spawn('python',['price_comparator_service.py',query]);
                let result ={}; 
                pyProg.stdout.on('data', function(data) {
                    result = JSON.parse(data);
                    //console.log(data);
                    result['found '] = true;
                    resolve(result);
                });
            }else{
                let response = {found : false}
                resolve(response);
            }
            
            });
}
module.exports = {
    getMeanPrice
}