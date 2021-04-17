import { getPriceEstimation } from '../accessors/builder'

export const priceEstimationService = async () => {
    const res = await getPriceEstimation();
    
    return res;
}

