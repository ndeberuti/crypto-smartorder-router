import { Pair } from "../interfaces/pair";
import { Side } from "../interfaces/side";
import { generateUUID } from "../lib/uuidGenerator";
import config from "config";
import sql from "mssql";
import { getOrderQuery, insertOrder } from "./queryRepository";
import { SwapOrder } from "../interfaces/swapOrder";

const dbConfig: sql.config = config.get('dbConfig')

export class DatabaseClient {
    private static instance: DatabaseClient;
    private sqlConnection: sql.ConnectionPool;

    constructor(sqlConnection: sql.ConnectionPool) {
        this.sqlConnection = sqlConnection;
    }

    static async getInstance(): Promise<DatabaseClient> {
        if (!this.instance) {
            const sqlConnection = await new sql.ConnectionPool(dbConfig).connect();
            this.instance = new this(sqlConnection);
        };
        
        return this.instance;
    }

    async saveOrder(clientId: string, pair: Pair, side: Side, volume: string, price: string): Promise<string> {
        const orderId: string = generateUUID();
        const insertOrderQuery: string = insertOrder(orderId, clientId, pair, side, volume, price);
        await this.sqlConnection.query(insertOrderQuery);
  
        return orderId;
    }

    async getOrder(orderId: string) {
        const selectOrderQuery: string = getOrderQuery(orderId);
        const result  = await this.sqlConnection.query(selectOrderQuery);

        const order: SwapOrder = result.recordset[0];

        return order;
    }
    
}

