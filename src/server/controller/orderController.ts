import express from 'express'
import { Order } from '../../interfaces/order';
import { SwapOrder } from '../../interfaces/swapOrder';
import { applyOrderService, swapOrderService } from '../../services/orderService'

export const swap = async (req: express.Request, res: express.Response, 
    next: express.NextFunction) => {
    try {
        const swapOrder: SwapOrder = req.body;
       
        console.log('RQ body', JSON.stringify(req.body));
        console.log('SWAP order', swapOrder);
        
        await swapOrderService(swapOrder);

        
        res.status(200).json({});
    } catch (error) {
        next(error)
    }
}

export const apply = async (req: express.Request, res: express.Response, 
    next: express.NextFunction) => {
    try {
        const orderType: Order = req.body.orderType;
        const orderId: string = req.params.id;

        console.log('RQ body', JSON.stringify({orderId, orderType}));

        await applyOrderService(orderId, orderType);

        res.status(200).json({});
    } catch (error) {
        next(error)
    }
}
