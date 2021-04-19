import { executeSwapOrder } from '../accessors/builder'
import { DatabaseClient } from '../clients/databaseClient';
import { SwapOrder } from '../interfaces/swapOrder';




export const swapOrderService = async (swapOrder: SwapOrder): Promise<any> => {
    
    const res = await executeSwapOrder(swapOrder);
    
    return res;
}

export const applyOrderService = async (orderId: string): Promise<any> => {
    const databaseInstance = await DatabaseClient.getInstance();
    
    const order: SwapOrder = await databaseInstance.getOrder(orderId);

    console.log('APPLY ORDER SWAP ORDER:', JSON.stringify(order))   ;
    const res = await executeSwapOrder(order);
    
    return res;
}

