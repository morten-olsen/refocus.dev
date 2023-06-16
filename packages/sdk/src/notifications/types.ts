type Notification = {
  view: Symbol;
  id?: string;
  title?: string;
  message: string;
  actions?: {
    label: string;
    callback: () => void;
  }[];
};

export type { Notification };
