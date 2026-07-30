import type { SelectTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';

type ISelectTriggerProps = SelectTriggerProps & {
  class?: HTMLAttributes['class'];
  size?: 'sm' | 'default';
};

export type { ISelectTriggerProps };
