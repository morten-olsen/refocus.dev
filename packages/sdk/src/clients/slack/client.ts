import type { WebClient } from '@slack/web-api';
import type { Expand } from '../../utils/types';

type MethodFromString<T extends `${string}.${string}`> =
  T extends `${infer A}.${infer B}`
    ? A extends keyof WebClient
      ? B extends keyof WebClient[A]
        ? WebClient[A][B] extends (...args: any) => any
          ? (
              ...args: Parameters<WebClient[A][B]>
            ) => ReturnType<WebClient[A][B]>
          : never
        : never
      : never
    : never;

type ParamsFromString<T extends `${string}.${string}`> =
  MethodFromString<T> extends (arg: infer P) => unknown
    ? P extends Record<string, any>
      ? P
      : never
    : never;
type ReturnFromString<T extends `${string}.${string}`> =
  MethodFromString<T> extends () => infer R
    ? R extends Promise<infer P>
      ? P
      : never
    : never;

class SlackClient {
  #token: string;

  constructor(token: string) {
    this.#token = token;
  }

  public send = async <K extends `${string}.${string}`>(
    action: K,
    params: Expand<ParamsFromString<K>>,
  ): Promise<Expand<ReturnFromString<K>>> => {
    const form = new FormData();
    form.append('token', this.#token);
    Object.keys(params).forEach((key) => {
      form.append(key, params[key as keyof typeof params]);
    });
    const response = await fetch(`https://slack.com/api/${action}`, {
      mode: 'cors',
      method: 'POST',
      body: form,
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText} ${action}`);
    }
    return response.json();
  };
}

export type { ReturnFromString };
export { SlackClient };
