import { TSchema, Static } from '@sinclair/typebox';

type Widget<TConfig extends TSchema> = {
  name: string;
  id: string;
  description?: string;
  icon?: React.ReactNode;
  schema: TSchema;
  parseUrl?: (url: URL) => Static<TConfig> | undefined;
  component: React.ComponentType<Static<TConfig>>;
  edit?: React.ComponentType<{
    value?: Static<TConfig>;
    save: (next: Static<TConfig>) => void;
  }>;
};

export type { Widget };
