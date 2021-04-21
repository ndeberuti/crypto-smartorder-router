import { Pair } from "./pair";
import { Side } from "./side";

export interface PriceEstimationRequest {
    pair: Pair;
    side: Side;
    volume: string;
}