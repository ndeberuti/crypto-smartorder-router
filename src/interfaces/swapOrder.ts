import { Pair } from "./pair";
import { Side } from "./side";

export interface SwapOrder {
    pair: Pair;
    side: Side;
    price: string;
    volume: string;
}