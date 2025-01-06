import { TradeList } from "@/components/trade/trade-list";
import { AddTradeButton } from "@/components/trade/add-trade-button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Stock Diary</h1>
        <AddTradeButton />
      </header>
      <main>
        <TradeList />
      </main>
    </div>
  );
}
