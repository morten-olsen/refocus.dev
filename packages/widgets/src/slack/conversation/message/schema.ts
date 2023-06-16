import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
  text: Type.String(),
  userId: Type.Optional(Type.String()),
});

type Props = Static<typeof schema>;

export type { Props };
export { schema };
