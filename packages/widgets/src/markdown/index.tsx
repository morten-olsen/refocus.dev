import { Widget } from '@refocus/sdk';
import { IoLogoMarkdown } from 'react-icons/io';
import { schema } from './schema';
import { Edit } from './edit';
import { View } from './view';

const widget: Widget<typeof schema> = {
  name: 'Markdown',
  description: 'A markdown note',
  icon: <IoLogoMarkdown />,
  id: 'text.markdown',
  schema,
  component: View,
  edit: Edit,
};

export default widget;
