import { Pair } from "../interfaces/pair";
import { Side } from "../interfaces/side";

export const insertOrder = (id: string, clientId:string, pair: Pair, side: Side, volume:string, price:string): string => {
    const query = `insert into orders (id, clientId, pair, side, volume, price) values('${id}', '${clientId}', '${pair}', '${side}', '${volume}', '${price}');`;

    return query;
}

export const getOrderQuery = (id: string): string => {
    const query = `select * from orders where id = '${id}'`;

    return query;
}