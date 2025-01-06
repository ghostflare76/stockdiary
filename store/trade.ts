import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Trade } from '@/types/trade';

interface TradeStore {
  trades: Trade[];
  addTrade: (trade: Omit<Trade, 'id'>) => void;
  updateTrade: (id: string, trade: Partial<Trade>) => void;
  deleteTrade: (id: string) => void;
}

export const useTradeStore = create<TradeStore>()(
  persist(
    (set) => ({
      trades: [],
      addTrade: (trade) =>
        set((state) => ({
          trades: [
            ...state.trades,
            {
              ...trade,
              id: crypto.randomUUID(),
            },
          ],
        })),
      updateTrade: (id, updatedTrade) =>
        set((state) => ({
          trades: state.trades.map((trade) =>
            trade.id === id ? { ...trade, ...updatedTrade } : trade
          ),
        })),
      deleteTrade: (id) =>
        set((state) => ({
          trades: state.trades.filter((trade) => trade.id !== id),
        })),
    }),
    {
      name: 'trade-storage',
    }
  )
); 