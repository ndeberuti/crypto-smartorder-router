import { executeSwapOrder } from '../accessors/okex/builder'
import { DatabaseClient } from '../clients/databaseClient';
import { Order } from '../interfaces/order';
import { SwapOrder } from '../interfaces/swapOrder';




export const swapOrderService = async (swapOrder: SwapOrder): Promise<void> => {
    
    await executeSwapOrder(swapOrder);
}

export const applyOrderService = async (orderId: string, orderType: Order): Promise<void> => {
    
    const databaseInstance = await DatabaseClient.getInstance();
    
    const order: SwapOrder = {
        ...await databaseInstance.getOrder(orderId),
        type: orderType
    };

    console.log('APPLY ORDER SWAP ORDER:', JSON.stringify(order));
    
    await executeSwapOrder(order);
}

