'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TradeForm } from '@/components/trade/trade-form';

export function AddTradeButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          매매 기록 추가
        </Button>
      </DialogTrigger>
      <TradeForm />
    </Dialog>
  );
} 