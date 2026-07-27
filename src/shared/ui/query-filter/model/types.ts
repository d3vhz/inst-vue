import type { IInputProps } from '../../input';
import type { ISelectProps } from '../../select';

interface IBaseQueryFilterProps {
  queryKey: string;
}

type IQueryFilterProps = IBaseQueryFilterProps &
  (
    | {
        type: 'Select';
        filterProps: ISelectProps;
      }
    | {
        type: 'Input';
        filterProps: IInputProps;
      }
  );

export type { IQueryFilterProps };
