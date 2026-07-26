import { statusItems } from '~/entities/post';
import { type IQueryFilterProps, QUERY_FILTER_TYPE } from '~/shared/ui';

const filters = [
  {
    queryKey: 'search',
    type: QUERY_FILTER_TYPE.Input,
    filterProps: {
      placeholder: 'Search',
    },
  },
  {
    queryKey: 'status',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: QUERY_FILTER_TYPE.Select as any,
    filterProps: {
      placeholder: 'Status',
      items: statusItems,
    },
  },
] satisfies IQueryFilterProps[];

export { filters };
