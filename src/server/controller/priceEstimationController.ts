import express from 'express'
import { PriceEstimation } from '../../interfaces/priceEstimation';
import { priceEstimationService } from '../../services/priceEstimationService'

export const checkPrice = async (req: express.Request, res: express.Response, 
    next: express.NextFunction) => {
    try {

        const priceEstimation: PriceEstimation = req.body;
        const clientId: any = req.headers['x-client-id'];
        
        const {status, data} = await priceEstimationService(clientId, priceEstimation);
        
        console.log('Controller res',JSON.stringify(data));

        res.status(status).json(data);
    } catch (error) {
        next(error)
    }
}
