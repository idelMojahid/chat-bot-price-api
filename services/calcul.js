var math = require('mathjs');
var _ = require('lodash');
meanPrices = (someArray)=>{
    if( someArray === undefined || someArray.length == 0){
        return null;
    }else{
        return math.mean(someArray);
    }
}
filterOutliers = (someArray) => {  
    try {
        var values = someArray.concat();
        values = _.compact(values);
        //console.log(values);
        values.sort( function(a, b) {
                return a - b;
             });
        var iqr = math.median(values) ; 
        // Then find min and max values
        var maxValue = iqr + iqr*0.75;
        var minValue = iqr - iqr*0.75;
        var filteredValues = values.filter(function(x) {
            return (x <= maxValue) && (x >= minValue);
        });  
        return filteredValues;
    } catch (error) {
        return [] ;
    }
   
}
module.exports = {
    filterOutliers,meanPrices
}