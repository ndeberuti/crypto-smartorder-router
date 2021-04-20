import { Order } from "./order";
import { Pair } from "./pair";
import { Side } from "./side";

export interface SwapOrder {
    pair: Pair;
    side: Side;
    type? : Order;
    price: string;
    volume: string;
}