var request = require('request');
var spawn = require("child_process").spawn;

getMeanPrice = function(query = 'iphone X'){
    return new Promise(
        function (resolve, reject) {
            const pyProg = spawn('python',['price_comparator_service.py',query]);
            let result ; 
            pyProg.stdout.on('data', function(data) {
                result = JSON.parse(data);
                resolve(result);
            });
            });
}
module.exports = {
    getMeanPrice
}