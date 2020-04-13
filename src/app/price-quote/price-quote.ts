import { Candle } from "./candle";
import { Technicals } from './technicals';
export interface PriceQuote {
    candles: Candle[];
    symbol: string;
    technicals: Technicals;
}
