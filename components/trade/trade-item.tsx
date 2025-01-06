'use client';

import { useState } from 'react';
import { Trade } from '@/types/trade';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { format } from 'date-fns';
import { TradeDetails } from './trade-details';
import { DeleteTradeAlert } from './delete-trade-alert';

interface TradeItemProps {
  trade: Trade;
  onEdit?: (id: string, trade: Partial<Trade>) => void;
  onDelete?: (id: string) => void;
}

export function TradeItem({ trade, onEdit, onDelete }: TradeItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const isBuy = trade.type === 'buy';

  const handleDelete = (trade: Trade) => {
    onDelete?.(trade.id);
    setShowDeleteAlert(false);
  };
  
  return (
    <>
      <div 
        className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg transition-colors cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex items-center gap-3">
          {isBuy ? (
            <ArrowUpCircle className="w-5 h-5 text-green-500" />
          ) : (
            <ArrowDownCircle className="w-5 h-5 text-red-500" />
          )}
          <div>
            <p className="font-medium">
              {isBuy ? '매수' : '매도'} {trade.quantity}주
            </p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(trade.date), 'yyyy.MM.dd')}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">${trade.price.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">
            총 ${(trade.price * trade.quantity).toLocaleString()}
          </p>
        </div>
      </div>

      <TradeDetails
        trade={trade}
        open={showDetails}
        onOpenChange={setShowDetails}
        onEdit={(updatedTrade) => onEdit?.(trade.id, updatedTrade)}
        onDelete={() => setShowDeleteAlert(true)}
      />

      <DeleteTradeAlert
        trade={trade}
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
        onConfirm={handleDelete}
      />
    </>
  );
} 