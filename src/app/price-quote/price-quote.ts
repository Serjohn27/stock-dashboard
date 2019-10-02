import { Candle } from "./candle";
export interface PriceQuote {
    candles: Candle[];
    symbol: string;
}
