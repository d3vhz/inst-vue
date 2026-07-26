import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useQueryFilters() {
  const router = useRouter();
  const route = useRoute();

  const resetAllFilters = () => {
    Object.keys(route.query).forEach((key) => {
      router.replace({
        query: {
          [key]: undefined,
        },
      });
    });
  };

  const resetFilters = (keys: string[]) => {
    keys.forEach((key) => {
      router.replace({
        query: {
          ...route.query,
          [key]: undefined,
        },
      });
    });
  };

  const resetFilter = (key: string) => {
    router.replace({
      query: {
        ...route.query,
        [key]: undefined,
      },
    });
  };

  const setFilter = (key: string, value: string) => {
    router.replace({
      query: {
        ...route.query,
        [key]: value || undefined,
      },
    });
  };

  const queryParams = computed(() => route.query);

  return {
    resetAllFilters,
    resetFilters,
    resetFilter,
    setFilter,
    queryParams,
  };
}
