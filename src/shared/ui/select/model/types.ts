type ISelectItem = {
  label: string;
  value: string;
};

type ISelectProps = {
  defaultValue?: string | number;
  modelValue?: string | number;
  placeholder?: string;
  items: ISelectItem[];
  disabled?: boolean;
};

export type { ISelectProps };
