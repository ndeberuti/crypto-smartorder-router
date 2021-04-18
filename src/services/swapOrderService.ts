import { executeSwapOrder } from '../accessors/builder'
import { SwapOrder } from '../interfaces/swapOrder';


export const swapOrderService = async (swapOrder: SwapOrder): Promise<any> => {
    
    const res = await executeSwapOrder(swapOrder);
    
    return res;
}

