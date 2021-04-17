import config from 'config'
import CryptoJS from 'crypto-js'

export const sign = (timestamp: string, method: string, endpoint: string ): string => {
   const secretKey: string = config.get('secretKey');
    
    const preSignedString = timestamp + method+ endpoint;
    const signedString =  CryptoJS.HmacSHA256(preSignedString, secretKey);
    const signedStringInBase64 = CryptoJS.enc.Base64.stringify(signedString);

    return signedStringInBase64;
}