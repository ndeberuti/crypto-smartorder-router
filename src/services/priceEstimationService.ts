import { getPriceEstimation, executeSwapOrder } from '../accessors/builder'
import { DatabaseClient } from '../clients/databaseClient';
import { PriceEstimation } from '../interfaces/priceEstimation';

export const priceEstimationService = async (clientId: string, priceEstimation: PriceEstimation): Promise<any> => {
    const price = await getPriceEstimation(priceEstimation);

    const databaseInstance = await DatabaseClient.getInstance();
    const orderId = await databaseInstance.saveOrder(clientId, priceEstimation.pair, priceEstimation.side, priceEstimation.volume, price);

    return { status: 200, data: {orderId, price}};
}

