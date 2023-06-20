import { Widget } from '@refocus/sdk';
import { github } from './github';
import { linear } from './linear';
import { slack } from './slack';
import markdown from './markdown';
import code from './code';

const widgets = [
  ...linear,
  ...github,
  ...slack,
  markdown,
  code,
] satisfies Widget<any>[];

export { widgets };
