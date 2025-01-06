export type TradeType = 'buy' | 'sell';

export interface Trade {
  id: string;
  ticker: string;
  type: TradeType;
  price: number;
  quantity: number;
  date: string;
  memo?: string;
}

export interface GroupedTrades {
  [ticker: string]: Trade[];
} 