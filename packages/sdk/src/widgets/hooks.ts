import { useCallback, useContext, useMemo, useState } from 'react';
import { WidgetsContext } from './context';
import { WidgetContext } from './widget-context';

const useWidget = (id: string) => {
  const context = useContext(WidgetsContext);
  if (!context) {
    throw new Error('useWidget must be used within a WidgetsProvider');
  }
  const current = useMemo(() => {
    return context.widgets.find((widget) => widget.id === id);
  }, [context.widgets, id]);

  return current;
};

const useWidgets = () => {
  const context = useContext(WidgetsContext);
  if (!context) {
    throw new Error('useWidgets must be used within a WidgetsProvider');
  }
  return context.widgets;
};

type WidgetResult = {
  id: string;
  data: any;
  description?: string;
  name: string;
  icon?: React.ReactNode;
};

const useGetWidgetsFromUrl = () => {
  const [current, setCurrent] = useState<WidgetResult[]>([]);
  const widgets = useWidgets();

  const update = useCallback(
    (url: URL) => {
      const result = widgets.map((widget) => {
        const parsed = widget.parseUrl?.(url);
        if (!parsed) {
          return null;
        }
        return {
          id: widget.id,
          name: widget.name,
          description: widget.description,
          icon: widget.icon,
          data: parsed,
        };
      });
      setCurrent(result.filter(Boolean) as WidgetResult[]);
    },
    [widgets],
  );

  return [current, update] as const;
};

const useDismissWidgetNotification = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error(
      'useDismissWidgetNotification must be used within a WidgetProvider',
    );
  }
  return context.dismissNotification;
};

const useAddWidgetNotification = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error(
      'useAddWidgetNotification must be used within a WidgetProvider',
    );
  }
  return context.addNotification;
};

const useWidgetNotifications = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error(
      'useWidgetNotifications must be used within a WidgetProvider',
    );
  }
  return context.notifications;
};

const useWidgetData = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidgetData must be used within a WidgetProvider');
  }
  return context.data;
};

const useSetWidgetData = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useSetWidgetData must be used within a WidgetProvider');
  }
  return context.setData;
};

const useWidgetId = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidgetId must be used within a WidgetProvider');
  }
  return context.id;
};

export {
  useWidget,
  useWidgets,
  useGetWidgetsFromUrl,
  useWidgetNotifications,
  useDismissWidgetNotification,
  useAddWidgetNotification,
  useWidgetData,
  useSetWidgetData,
  useWidgetId,
};
