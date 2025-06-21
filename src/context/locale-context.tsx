'use client';

import React, { createContext, useState, ReactNode } from 'react';

export type Language = 'id' | 'en';
export type Currency = 'idr' | 'usd';

const EXCHANGE_RATE_USD_TO_IDR = 15500;

type LocaleContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (translations: Record<Language, string>) => string;
  formatCurrency: (amountInUsd: number) => string;
};

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');
  const [currency, setCurrency] = useState<Currency>('idr');

  const t = (translations: Record<string, string>): string => {
    return translations[language] || translations['en'];
  };

  const formatCurrency = (amountInUsd: number): string => {
    if (currency === 'idr') {
      const amountInIdr = amountInUsd * EXCHANGE_RATE_USD_TO_IDR;
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amountInIdr);
    }
    // Default to USD
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amountInUsd);
  };

  return (
    <LocaleContext.Provider value={{ language, setLanguage, currency, setCurrency, t, formatCurrency }}>
      {children}
    </LocaleContext.Provider>
  );
}
