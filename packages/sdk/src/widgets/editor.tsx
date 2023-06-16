import { useWidget } from '.';
import { useWidgetData, useWidgetId } from './hooks';

type WidgetRenderProps = {
  onSave: (data: any) => void;
};

const WidgetEditor: React.FC<WidgetRenderProps> = ({ onSave }) => {
  const id = useWidgetId();
  const data = useWidgetData();
  const widget = useWidget(id);

  if (!widget) {
    return null;
  }

  const Component = widget.edit;

  if (!Component) {
    return null;
  }

  return <Component value={data} save={onSave} />;
};

export { WidgetEditor };
