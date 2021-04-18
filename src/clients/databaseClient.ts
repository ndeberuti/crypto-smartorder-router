import { Pair } from "../interfaces/pair";
import { Side } from "../interfaces/side";
import { generateUUID } from "../lib/uuidGenerator";

const testTable: Array<Object> = [];

export class DatabaseClient {
    private table: Array<Object>;
    private static instance: DatabaseClient;

    constructor(table: Array<Object>) {
        this.table = table;
    }

    static getInstance(): DatabaseClient {
        if (!this.instance) {
          this.instance = new this(testTable);
        }
    
        return this.instance;
      }
    
    savePrice(clientId: string, pair: Pair, side: Side, price: string): string {
        const id = generateUUID();
        this.table.push({
            id,
            clientId,
            pair,
            side,
            price
        });

        console.log(this.table);
        return id;
    }
    
}

