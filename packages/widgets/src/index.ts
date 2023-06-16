import { Widget } from '@refocus/sdk';
import { github } from './github';
import { linear } from './linear';
import { slack } from './slack';

const widgets = [...linear, ...github, ...slack] satisfies Widget<any>[];

export { widgets };
