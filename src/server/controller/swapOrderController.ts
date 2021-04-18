import express from 'express'
import { SwapOrder } from '../../interfaces/swapOrder';
import { swapOrderService } from '../../services/swapOrderService'

export const swap = async (req: express.Request, res: express.Response, 
    next: express.NextFunction) => {
    try {
        const swapOrder: SwapOrder = req.body;

        console.log('RQ body', JSON.stringify(req.body));

        console.log('SWAP order', swapOrder);
        
        const {status, data} = await swapOrderService(swapOrder);


        console.log('Controller res',JSON.stringify(data));
        
        if (data.code !== '0') {
            return res.status(400).json(data)
        }

        res.status(status).json(data);
    } catch (error) {
        next(error)
    }
}
