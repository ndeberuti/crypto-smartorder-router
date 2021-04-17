import axios, { AxiosRequestConfig } from 'axios'
import config from 'config'
import { sign } from './lib/sign';

export const getPriceEstimation = async (): Promise<any> => {
    const accessKey: string = config.get('apiKey');
    const timestamp: string = new Date().toISOString();
    const baseUrl: string = config.get('baseUrl');
    const timeout: number = config.get('timeout');
    const passphrase: string = config.get('passphrase');
    const method: string = 'GET';
    const priceEstimationEndpoint: string = config.get('priceEstimationEndpoint');
    const url: string = baseUrl + priceEstimationEndpoint;
    
    const params = {
        'ccy': 'BTC',
    };

    const headers = {
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY': accessKey,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': passphrase,
        'OK-ACCESS-SIGN': sign(timestamp, method, priceEstimationEndpoint, params),
        'x-simulated-trading': 1
    }

    try {
        const response = await axios.request({
            method: 'get',
            url,
            headers,
            params,
            timeout
        });

        return response;
    } catch (error) {
        console.log(error);    
    }
    
    
}