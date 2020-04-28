
export const getTierName = (code) => {
    var tiername = '';
    if(code){
        switch(code){
                case 'GLD':
                    tiername = 'GOLD';
                    break;
                case 'PLT':
                    tiername = 'PLATINUM';
                    break;
                case 'DIA':
                    tiername = 'DIAMOND';
                    break;
                case 'DIAP':
                    tiername = 'DIAMOND PLUS';
                    break;
                case 'DIAE':
                    tiername = 'DIAMOND ElITE';
                    break;
                case 'SEV':
                    tiername = 'SEVEN STAR';
                    break;
        }
    }
    return tiername;  
}


export const getTierDetails = (tiers, code) => {   
    if(tiers && code){
        var usertier = tiers.find(t => t.name === code);
        return(usertier);
    }  
}

export const getProperty = (properties, code) =>{
        if(properties && code){
        var prop = properties.find(t => t.id.toUpperCase() === code.toUpperCase());
        return(prop);
    }
}
export const buildEnterpriseResponse = (list) =>{
    var response = [];
    if(list){
        for (var a = 0, len = list.length; a < len; a++) {           
            response.push({
                propertyCode: list[a].propCode,
                rateSet: list[a].roomtype["rateSet"],
                rate: list[a].roomtype["amount"]
            });
        }
        return(response);
    }    
}
 
export const getPropertiesListByCode = (list, codes) => {
    //Return Prop code and prop name
    var propertyNamesList = [];
    if (list != null && list != undefined) {
        for (var i = 0; i < list.length; i++) {
            for (let index = 0; index < codes.length; index++) {
                if (codes[index] === list[i].id) {
                    propertyNamesList.push({ "id": list[i].id +','+list[i].marketCode, "name": list[i].name });
                }
            }
        }
    }
    return propertyNamesList;
}

export const getUrlParams = (search) => {
    const params = {};
    if(search) {
        search = decodeURIComponent(search.toLowerCase());
        search = decodeURIComponent(search);
        const hashes = search.slice(search.indexOf('?') + 1).split('&');
        hashes.map(hash => {
            const [key, val] = hash.split('=')
            params[key] = decodeURIComponent(val)
        });
    }
    return params
}

export const getMarketDetails = (markets, code) => {
    if(markets && code) {
        const market = markets.filter((market) => {
            return market.Code.toLowerCase() === code.toLowerCase();
        });
        if(market && market.length) {
            return market[0];
        }
    }
    return null;
}

export const getPropertiesOfMarket = (markets, code) => {
    const market = getMarketDetails(markets, code);
    return market && market.Properties && market.Properties.length ? market.Properties : [];
}