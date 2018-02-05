import requests
import json
import numpy as np
import sys
#import image_dowloader
from image_dowloader import search_tag
def price_remove_outliners(data) :
    data.sort(reverse=True)
    data = data[:20]
    data = reject_outliers(data)
    return data
def get_price_mean(data) : 
    return np.percentile(data, 50)
def reject_outliers(data, m = 50):
    elements = np.array(data)
    mean = np.mean(elements, axis=0)
    sd = np.std(elements, axis=0)
    final_list = [x for x in data if (x > mean - m * sd)]
    reject_outliers = [x for x in final_list if (x < mean + m * sd)]
    return reject_outliers
query = str(sys.argv[1])
prices = []
ads = []
for i in range(1,5) : 
    r = requests.get('https://www.avito.ma/lij?q='+query+'&o='+str(i))
    results = json.loads(r.text)
    #ads += results['list_ads']
   
    for ad in results['list_ads'] :
        if 'price' in ad :
            prices.append(int(ad['price'].replace('.','')))    
    ads = ads + results['list_ads']
price_without_outliners = price_remove_outliners(prices)
mean_price = get_price_mean(price_without_outliners)
product_price = {'product' : query,'mean_price' : mean_price,'image' : search_tag(query)}
print json.dumps(product_price)