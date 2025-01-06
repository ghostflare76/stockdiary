'use client';

import { useTradeStore } from '@/store/trade';
import { TradeItem } from './trade-item';
import { Card } from '@/components/ui/card';
import { Trade } from '@/types/trade';

export function TradeList() {
  const trades = useTradeStore((state) => state.trades);
  const updateTrade = useTradeStore((state) => state.updateTrade);
  const deleteTrade = useTradeStore((state) => state.deleteTrade);

  // Ticker별로 그룹화
  const groupedTrades = trades.reduce((acc, trade) => {
    if (!acc[trade.ticker]) {
      acc[trade.ticker] = [];
    }
    acc[trade.ticker].push(trade);
    return acc;
  }, {} as { [key: string]: Trade[] });

  return (
    <div className="space-y-6">
      {Object.entries(groupedTrades).map(([ticker, trades]) => (
        <Card key={ticker} className="p-4">
          <h2 className="text-xl font-semibold mb-4">{ticker}</h2>
          <div className="space-y-2">
            {trades.map((trade) => (
              <TradeItem 
                key={trade.id} 
                trade={trade}
                onEdit={updateTrade}
                onDelete={deleteTrade}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
} 