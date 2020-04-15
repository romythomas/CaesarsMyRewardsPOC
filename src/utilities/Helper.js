
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

