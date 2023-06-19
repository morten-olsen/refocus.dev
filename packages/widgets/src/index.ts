import { Widget } from '@refocus/sdk';
import { github } from './github';
import { linear } from './linear';
import { slack } from './slack';
import markdown from './markdown';

const widgets = [
  ...linear,
  ...github,
  ...slack,
  markdown,
] satisfies Widget<any>[];

export { widgets };
