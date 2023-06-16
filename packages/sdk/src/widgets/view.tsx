import { useWidget } from '.';
import { useWidgetData, useWidgetId } from './hooks';

const WidgetView: React.FC = () => {
  const id = useWidgetId();
  const data = useWidgetData();
  const widget = useWidget(id);

  if (!widget) {
    return null;
  }

  const Component = widget.component;

  return <Component {...data} />;
};

export { WidgetView };
