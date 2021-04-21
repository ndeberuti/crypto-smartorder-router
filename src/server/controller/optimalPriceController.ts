import express from 'express'

import { PriceEstimationRequest } from '../../interfaces/priceEstimationRequest'
import { optimalPriceService } from '../../services/optimalPriceService'

export const optimalPrice = async (req: express.Request, res: express.Response, 
    next: express.NextFunction) => {
    try {

        const priceEstimation: PriceEstimationRequest = req.body;
        const clientId = typeof req.headers['x-client-id'] === 'string' ? req.headers['x-client-id']: '';

        const data = await optimalPriceService(clientId, priceEstimation);
        
        res.status(200).send(data);
    } catch (error) {
        next(error)
    }
}
