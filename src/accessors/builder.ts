import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import config from 'config'
import { SwapOrder } from '../interfaces/swapOrder';
import { sign } from './lib/signer';

export const getPriceEstimation = async (): Promise<Object> => {
    const accessKey: string = config.get('apiKey');
    const timestamp: string = new Date().toISOString();
    const baseUrl: string = config.get('baseUrl');
    const timeout: number = config.get('timeout');
    const passphrase: string = config.get('passphrase');
    const method: string = 'GET';
    const priceEstimationEndpoint: string = config.get('priceEstimationEndpoint');
    const url: string = baseUrl + priceEstimationEndpoint;
    
    const params = {
        'instType': 'SWAP',
        'uly': 'ETH-USDT'
    };

    const headers = {
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY': accessKey,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': passphrase,
        'OK-ACCESS-SIGN': sign(timestamp, method, priceEstimationEndpoint, params, undefined),
        'x-simulated-trading': 1
    }

    const response = await axios.request({
        method: 'get',
        url,
        headers,
        params,
        timeout
    });

    const {
        askPx: bestAskPrice,
        askSz: bestAskSize,
        bidPx: bestBidPrice,
        bidSz: bestBidSize
    } = response.data.data[0];

    return {bestAskPrice, bestAskSize, bestBidPrice, bestBidSize};

    
    
}

export const executeSwapOrder = async (swapOrder: SwapOrder): Promise<Object> => {
    const {
        pair,
        price,
        side,
        volume
    } = swapOrder;

    const accessKey: string = config.get('apiKey');
    const timestamp: string = new Date().toISOString();
    const baseUrl: string = config.get('baseUrl');
    const timeout: number = config.get('timeout');
    const passphrase: string = config.get('passphrase');
    const method: string = 'POST';
    const swapEndpoint: string = config.get('swapEndpoint');
    const url: string = baseUrl + swapEndpoint;

    const body = {
        "instId": pair,
        "tdMode": "cash",
        "_feReq": true,
        "side": side,
        "ordType": "limit",
        "px": price,
        "sz": volume
    };

    const headers = {
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY': accessKey,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': passphrase,
        'OK-ACCESS-SIGN': sign(timestamp, method, swapEndpoint, undefined, body),
        'x-simulated-trading': 1
    }

    console.log('BODY', JSON.stringify(body));

    const response = await axios.request({
        method: 'post',
        url,
        headers,
        data: body,
        timeout
    });

   

    return response;
}