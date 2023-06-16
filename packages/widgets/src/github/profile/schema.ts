import { Type, Static } from '@sinclair/typebox';

const schema = Type.Object({
  username: Type.String(),
});

type Props = Static<typeof schema>;

export type { Props };
export { schema };
