import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
  conversationId: Type.String(),
  ts: Type.Optional(Type.String()),
});

type Props = Static<typeof schema>;

export type { Props };
export { schema };
