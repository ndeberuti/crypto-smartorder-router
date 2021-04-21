import { getOptimalPriceEstimation } from '../accessors/okex/builder'
import { DatabaseClient } from '../clients/databaseClient';
import { PriceEstimationRequest } from '../interfaces/priceEstimationRequest';

export const optimalPriceService = async (clientId: string, priceEstimation: PriceEstimationRequest): Promise<Object> => {
    const price = await getOptimalPriceEstimation(priceEstimation);

    const databaseInstance = await DatabaseClient.getInstance();
    const orderId = await databaseInstance.saveOrder(clientId, priceEstimation.pair, priceEstimation.side, priceEstimation.volume, price);

    return { price, orderId };
}

