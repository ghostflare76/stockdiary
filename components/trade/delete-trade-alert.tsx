'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trade } from "@/types/trade";

interface DeleteTradeAlertProps {
  trade: Trade;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (trade: Trade) => void;
}

export function DeleteTradeAlert({ trade, open, onOpenChange, onConfirm }: DeleteTradeAlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>매매 기록을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            {trade.ticker}의 {trade.type === 'buy' ? '매수' : '매도'} 기록이 영구적으로 삭제됩니다.
            이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm(trade)}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 