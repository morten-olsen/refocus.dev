import { ReturnFromString } from './client';

type Profile = Exclude<ReturnFromString<'users.info'>['user'], undefined>;

export type { Profile };
