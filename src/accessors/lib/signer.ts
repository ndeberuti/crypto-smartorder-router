import config from 'config'
import CryptoJS from 'crypto-js'

export const sign = (timestamp: string, method: string, endpoint: string, params?: Object, body?: Object): string => {
   const secretKey: string = config.get('secretKey');
    const endpointWithParams = addParamsToEndpoint(endpoint, params);
    const preSignedString = timestamp + method + endpointWithParams + (body !== undefined ? JSON.stringify(body) : '');
    const signedString =  CryptoJS.HmacSHA256(preSignedString, secretKey);
    const signedStringInBase64 = CryptoJS.enc.Base64.stringify(signedString);

    return signedStringInBase64;
}

const addParamsToEndpoint = (endpoint: string, params: any): string => {
    let endpointWithParams = endpoint;
    let first: Boolean = true;
    for (const param in params) {
        if (first) {
            endpointWithParams = endpointWithParams + '?' + param + '=' + params[param];
            first = false;
        } else {
            endpointWithParams = endpointWithParams + '&' + param + '=' + params[param];
        }
    }
    
    return endpointWithParams;
}