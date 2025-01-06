'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trade } from "@/types/trade";
import { format } from "date-fns";
import { ArrowUpCircle, ArrowDownCircle, Pencil, Trash2 } from "lucide-react";

interface TradeDetailsProps {
  trade: Trade;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (trade: Trade) => void;
  onDelete?: (trade: Trade) => void;
}

export function TradeDetails({ trade, open, onOpenChange, onEdit, onDelete }: TradeDetailsProps) {
  const isBuy = trade.type === 'buy';
  const totalAmount = trade.price * trade.quantity;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isBuy ? (
              <ArrowUpCircle className="w-5 h-5 text-green-500" />
            ) : (
              <ArrowDownCircle className="w-5 h-5 text-red-500" />
            )}
            {trade.ticker} {isBuy ? '매수' : '매도'} 기록
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">거래 가격</p>
              <p className="text-lg">${trade.price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">수량</p>
              <p className="text-lg">{trade.quantity.toLocaleString()} 주</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">총 거래금액</p>
            <p className="text-lg">${totalAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">거래일</p>
            <p className="text-lg">{format(new Date(trade.date), 'yyyy년 MM월 dd일')}</p>
          </div>
          {trade.memo && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">메모</p>
              <p className="text-lg whitespace-pre-wrap">{trade.memo}</p>
            </div>
          )}
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit?.(trade)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete?.(trade)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 