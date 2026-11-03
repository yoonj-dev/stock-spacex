import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { SingleStockTerminal } from './components/dashboard/SingleStockTerminal';
import { Footer } from './components/layout/Footer';
import { ThemeMode, getStoredThemeMode, applyThemeToDom, resolveTheme } from './lib/theme';
import { fetchStockData } from './lib/stockApi';
import { StockData, StockFundamentals } from './types/stock';
import { SPACEX_PROFILE } from './lib/profiles/spacexProfile';

const BASELINE_SPACEX_DATA: StockFundamentals = {
  ticker: 'SPCX',
  symbol: 'SPCX',
  currentPrice: 148.50,
  previousClose: 142.20,
  change: 6.30,
  changePercent: 4.43,
  marketState: 'REGULAR',
  marketCap: 250000000000,
  trailingPE: 48.5,
  forwardPE: 38.2,
  priceToBook: 8.5,
  pegRatio: 1.45,
  fiftyTwoWeekLow: 95.0,
  fiftyTwoWeekHigh: 155.0,
  targetMeanPrice: 175.0,
  targetHighPrice: 220.0,
  targetLowPrice: 110.0,
};

export const App: React.FC = () => {
  const [currentThemeMode, setCurrentThemeMode] = useState<ThemeMode>(getStoredThemeMode);
  const [spacexData, setSpacexData] = useState<StockData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    applyThemeToDom(currentThemeMode, true);
  }, [currentThemeMode]);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchStockData('SPCX');
      if (data?.fundamentals) {
        setSpacexData(data);
      }
    } catch (err) {
      console.warn('[App] Failed to refresh live data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  const fundamentals = spacexData?.fundamentals || BASELINE_SPACEX_DATA;
  const candles = spacexData?.candles?.['1d_intraday'] || [];
  const resolvedTheme = resolveTheme(currentThemeMode);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5f7] dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors">
      <Header
        currentThemeMode={currentThemeMode}
        onThemeModeChanged={setCurrentThemeMode}
        fundamentals={fundamentals}
        isRefreshing={isRefreshing}
        onRefresh={loadData}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-5">
        <SingleStockTerminal
          profile={SPACEX_PROFILE}
          fundamentals={fundamentals}
          candles={candles}
          resolvedTheme={resolvedTheme}
          isRefreshing={isRefreshing}
          onRefresh={loadData}
        />
      </main>

      <Footer />
    </div>
  );
};
