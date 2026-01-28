import { createContext, useContext } from 'react';

import type { Cta } from '@/sanity/types';
import type { FC, PropsWithChildren } from 'react';

export interface PageContextType {
  ALL_CTAS?: Record<string, Cta>;
}

interface PageProviderProps extends PageContextType, PropsWithChildren {}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider: FC<PageProviderProps> = ({ ALL_CTAS, children }) => (
  <PageContext.Provider
    value={{
      ALL_CTAS,
    }}
  >
    {children}
  </PageContext.Provider>
);

export const usePage = (): PageContextType => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }

  return context;
};
