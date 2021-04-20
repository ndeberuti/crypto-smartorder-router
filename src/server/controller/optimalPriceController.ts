import express from 'express'

import { PriceEstimation } from '../../interfaces/priceEstimation'
import { optimalPriceService } from '../../services/optimalPriceService'

export const optimalPrice = async (req: express.Request, res: express.Response, 
    next: express.NextFunction) => {
    try {

        const priceEstimation: PriceEstimation = req.body;
        const clientId = typeof req.headers['x-client-id'] === 'string' ? req.headers['x-client-id']: '';

        const data = await optimalPriceService(clientId, priceEstimation);
        // const stringifiedData: string = JSON.stringify(data);
        
        res.status(200).send(data);
    } catch (error) {
        next(error)
    }
}
