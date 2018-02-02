This repo contains the data source of the chat bot "Data stream"

# Main sources of prices
## Avito
Using the api of avito :
https://www.avito.ma/lij?o=2&q=iphone&mpr=2500&ca=5
* o = pagination page
* q = the search query
* mpr = minimum price
* cg = category 
    * http://www.avito.ma/templates/api/confcategories.js?v=3
* ca =  city id 
    * http://www.avito.ma/templates/api/confregions.js?v=3
## Vendo
Personnaly i like the work of vendo.ma
#### Search : 
* **endpoint** :  http://vendo.ma/search/searchOffers
* **body params** :
    * query : iphone x+
    * p : 1 (page)
    * hasMapItems : false
    * suggest : false
    * firstPageCount : 12
    * fitlers (concatened to query ) :
        * price :
            * à moins de (a) dh
            * à plus de (b) dh
            * entre (a) dh et (b) dh
        * options :
            * #EPay : Paiement en ligne
            * #Cash : Paiement en espèce
            * #Livraison : Livraison
            * #Store : Boutique et magasin
            * #EStore : Boutique en ligne
            * #Promo : Promotion et deal
    
### Autocomplete
* **endpoint** :  http://vendo.ma/autocomplete
* **body params** :
    * query  : samsu