import { isFunction, isNotNil } from 'es-toolkit/predicate';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type { IRouteMeta } from '~/shared/model';

export function useBreadcrumbs() {
  const route = useRoute();

  const breadcrumbs = computed(() => {
    return route.matched
      .filter(({ meta }) => isNotNil(meta.breadcrumb))
      .map(({ meta, children, path }) => {
        const breadcrumb = meta.breadcrumb as IRouteMeta['breadcrumb'];

        return {
          label: isFunction(breadcrumb.label)
            ? breadcrumb.label(route.params)
            : breadcrumb.label,
          path: children.length ? path : null,
          disabled: breadcrumb.disabled,
        };
      });
  });

  return {
    breadcrumbs,
  };
}
