import express from 'express'
import * as priceEstimationService from '../../services/priceEstimationService'

export const checkPrice = async (req: express.Request, res: express.Response, 
    next: express.NextFunction) => {
    try {
        await priceEstimationService.estimate();
        
        return res.status(200).json({status: req.params});
    } catch (error) {
        next(error)
    }
}
