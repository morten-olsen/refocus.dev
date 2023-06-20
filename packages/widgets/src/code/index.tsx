import { Widget } from '@refocus/sdk';
import { IoLogoMarkdown } from 'react-icons/io';
import { schema } from './schema';
import { Edit } from './edit';
import { View } from './view';

const widget: Widget<typeof schema> = {
  name: 'Code',
  description: 'Write a code file',
  icon: <IoLogoMarkdown />,
  id: 'text.code',
  schema,
  component: View,
  edit: Edit,
};

export default widget;
