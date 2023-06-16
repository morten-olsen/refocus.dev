import { Widget } from '@refocus/sdk';
import slackConversation from './conversation/index.widget';

const slack = [slackConversation] satisfies Widget<any>[];

export { slack };
