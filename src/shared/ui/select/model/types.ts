import type { ISelectTriggerProps } from '../../select-items';

type ISelectItem = {
  label: string;
  value: string;
};

type ISelectProps = {
  placeholder?: string;
  items: ISelectItem[];
  selectTriggerProps?: ISelectTriggerProps;
};

export type { ISelectProps };
