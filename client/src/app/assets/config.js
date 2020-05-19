const ak = service => {
    switch (service) {
        case 'open-weather':
            return '6fcf99aaad393502d0324bf8b15bcad3';    
        case 'weather':
            return 'cacc83c7974cf5198e445c762765aab9';    
        case 'map':
            return 'pk.eyJ1Ijoicm90YXJzZWJhc3RpYW4iLCJhIjoiY2s2bms3MmMyMGI0cDNtcWJsODB2dW03ZCJ9.Lc1q2J-07Nm3wzWSZr6VeA';    
        default:
            break;
    }
}

export default ak;