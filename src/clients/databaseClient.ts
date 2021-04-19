import { Pair } from "../interfaces/pair";
import { Side } from "../interfaces/side";
import { generateUUID } from "../lib/uuidGenerator";
import config from "config";
import sql from "mssql";
import { getOrderQuery, insertOrder } from "./queryRepository";
import { SwapOrder } from "../interfaces/swapOrder";


const dbConfig: sql.config = config.get('dbConfig')

const testTable: Array<any> = [];

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
        const id: string = generateUUID();
        const query: string = insertOrder(id, clientId, pair, side, volume, price);

        console.log('QUERY:', query);
        await this.sqlConnection.query(query);
  
        return id;
    }

    async getOrder(orderId: string) {
        const query: string = getOrderQuery(orderId);
        const result  = await this.sqlConnection.query(query);
        console.log('RESUUUULT:', result);
        const order: SwapOrder = result.recordset[0]

        console.log('ORDEEEER:', order);
        return order;
    }
    
}

