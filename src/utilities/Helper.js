
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
export const isEmpty = (val) =>{
    return (val === null || val === undefined || new string(val) == '' || new string(val) == 'null');
}