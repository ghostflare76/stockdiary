'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useTradeStore } from '@/store/trade';
import { Trade } from '@/types/trade';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const tradeFormSchema = z.object({
  ticker: z.string().min(1, '종목 코드를 입력해주세요'),
  type: z.enum(['buy', 'sell'], {
    required_error: '매수/매도를 선택해주세요',
  }),
  price: z.string().min(1, '가격을 입력해주세요'),
  quantity: z.string().min(1, '수량을 입력해주세요'),
  date: z.string().min(1, '날짜를 입력해주세요'),
  memo: z.string().optional(),
});

type TradeFormValues = z.infer<typeof tradeFormSchema>;

interface TradeFormProps {
  trade?: Trade;
  onSuccess?: () => void;
}

export function TradeForm({ trade, onSuccess }: TradeFormProps) {
  const addTrade = useTradeStore((state) => state.addTrade);
  const updateTrade = useTradeStore((state) => state.updateTrade);

  const form = useForm<TradeFormValues>({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: trade ? {
      ...trade,
      price: String(trade.price),
      quantity: String(trade.quantity),
    } : {
      type: 'buy',
      date: new Date().toISOString().split('T')[0],
    },
  });

  function onSubmit(data: TradeFormValues) {
    const tradeData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity),
    };

    if (trade) {
      updateTrade(trade.id, tradeData);
    } else {
      addTrade(tradeData);
    }

    onSuccess?.();
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {trade ? '매매 기록 수정' : '매매 기록 추가'}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="ticker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>종목 코드</FormLabel>
              <FormControl>
                <Input placeholder="AAPL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>매매 유형</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buy" id="buy" />
                    <Label htmlFor="buy">매수</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sell" id="sell" />
                    <Label htmlFor="sell">매도</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>가격</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>수량</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>날짜</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="memo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>메모</FormLabel>
              <FormControl>
                <Textarea placeholder="매매 사유나 특이사항을 기록하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit">
            {trade ? '수정' : '저장'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
} 