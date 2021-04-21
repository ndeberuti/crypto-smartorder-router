import axios from 'axios'
import config from 'config'
import { Order } from '../../interfaces/order';

import { PriceEstimationRequest } from '../../interfaces/priceEstimationRequest';
import { Side } from '../../interfaces/side';
import { SwapOrder } from '../../interfaces/swapOrder';
import { sign } from '../lib/signer';

export const getOptimalPriceEstimation = async (priceEstimation: PriceEstimationRequest): Promise<string> => {
    const { pair, side } = priceEstimation;

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
        'uly': pair
    };

    const headers = {
        'Content-Type': 'application/json',
        'OK-ACCESS-KEY': accessKey,
        'OK-ACCESS-TIMESTAMP': timestamp,
        'OK-ACCESS-PASSPHRASE': passphrase,
        'OK-ACCESS-SIGN': sign(timestamp, method, priceEstimationEndpoint, params, undefined),
        'x-simulated-trading': 1
    }

    const {status, data} = await axios.request({
        method: 'get',
        url,
        headers,
        params,
        timeout
    });

    if(status !== 200) throw new Error('Cannot request optimal price');

    let bestPrice = side === Side.Buy ? data.data[0].bidPx : data.data[0].askPx;

    return bestPrice;
}

export const executeSwapOrder = async (swapOrder: SwapOrder): Promise<void> => {
    const {
        pair,
        price,
        side,
        volume,
        type = Order.Ioc
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
        "side": side,
        "ordType": type,
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

    const { status } = await axios.request({
        method: 'post',
        url,
        headers,
        data: body,
        timeout
    });

    if(status !== 200) throw new Error('Cannot apply order');
}