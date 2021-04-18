import { Pair } from "./pair";
import { Side } from "./side";

export interface PriceEstimation {
    pair: Pair;
    side: Side;
    volume: string;
}