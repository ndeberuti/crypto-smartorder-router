import config from 'config'
import CryptoJS from 'crypto-js'

export const sign = (timestamp: string, method: string, endpoint: string, params: Object ): string => {
   const secretKey: string = config.get('secretKey');
    const endpointWithParams = addParamsToEndpoint(endpoint, params);
    const preSignedString = timestamp + method + endpointWithParams;
    const signedString =  CryptoJS.HmacSHA256(preSignedString, secretKey);
    const signedStringInBase64 = CryptoJS.enc.Base64.stringify(signedString);

    return signedStringInBase64;
}

const addParamsToEndpoint = (endpoint: string, params: any): string => {
    let endpointWithParams = endpoint;
    for (const param in params) {
        endpointWithParams = endpointWithParams + '?' + param + '=' + params[param];
    }
    
    return endpointWithParams;
}