import { TSchema } from '@sinclair/typebox';
import { createContext, useState } from 'react';
import { Widget } from './types';

type WidgetsContextValue = {
  widgets: Widget<TSchema>[];
};

type WidgetsProviderProps = {
  children: React.ReactNode;
  widgets?: Widget<TSchema>[];
};

const WidgetsContext = createContext<WidgetsContextValue | null>(null);

const WidgetsProvider: React.FC<WidgetsProviderProps> = ({
  children,
  widgets: initialWidgets,
}) => {
  const [widgets] = useState<Widget<TSchema>[]>(initialWidgets || []);

  return (
    <WidgetsContext.Provider value={{ widgets }}>
      {children}
    </WidgetsContext.Provider>
  );
};

export { WidgetsContext, WidgetsProvider };
