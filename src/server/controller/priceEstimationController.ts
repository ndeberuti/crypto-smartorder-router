import express from 'express'
import { priceEstimationService } from '../../services/priceEstimationService'

export const checkPrice = async (req: express.Request, res: express.Response, 
    next: express.NextFunction) => {
    try {
        
        await priceEstimationService();
        
        return res.status(200).json({status: req.params});
    } catch (error) {
        next(error)
    }
}
