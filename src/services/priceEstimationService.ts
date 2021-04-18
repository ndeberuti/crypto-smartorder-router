import { getPriceEstimation, executeSwapOrder } from '../accessors/builder'
import { DatabaseClient } from '../clients/databaseClient';
import { PriceEstimation } from '../interfaces/priceEstimation';
const databaseInstance = DatabaseClient.getInstance();

export const priceEstimationService = async (clientId: string, priceEstimation: PriceEstimation): Promise<any> => {
    const price = await getPriceEstimation(priceEstimation);
   
    const orderId = databaseInstance.savePrice(clientId, priceEstimation.pair, priceEstimation.side, price);

    return { status: 200, data: {orderId}};
}

