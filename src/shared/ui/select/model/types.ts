type ISelectItem = {
  label: string;
  value: string;
};

type ISelectProps = {
  placeholder?: string;
  items: ISelectItem[];
};

export type { ISelectProps };
