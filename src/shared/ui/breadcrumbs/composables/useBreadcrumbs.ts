import { isFunction } from 'es-toolkit/predicate';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type { IBreadcrumb, IRouteMeta } from '~/shared/model';

export function useBreadcrumbs() {
  const route = useRoute();

  const breadcrumbs = computed(() => {
    return route.matched.map(({ meta, children, path }) => {
      const routeMeta = meta as IRouteMeta;

      return {
        label: (isFunction(routeMeta.breadcrumb.label)
          ? routeMeta.breadcrumb.label(route.params)
          : routeMeta.breadcrumb.label) as IBreadcrumb['label'],
        path: (children.length ? path : null) as IBreadcrumb['path'],
        disabled: routeMeta.breadcrumb.disabled,
      };
    });
  });

  return {
    breadcrumbs,
  };
}
