type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// expands object types recursively
type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

type AsyncResponse<T> = T extends () => Promise<infer U> ? U : never;

type FirstParameter<T> = T extends (arg1: infer U, ...args: any[]) => any
  ? U
  : never;

export type { Expand, ExpandRecursively, AsyncResponse, FirstParameter };
