import { isArray, isNil, isObject, omitBy } from 'es-toolkit/compat';

const buildUrlWithParams = (
  url: string,
  params?: Record<string, unknown>
): string => {
  if (!params) return url;

  const cleanParams = omitBy(params, isNil);

  if (Object.keys(cleanParams).length === 0) return url;

  const searchParams = new URLSearchParams();

  Object.entries(cleanParams).forEach(([key, value]) => {
    if (isArray(value)) {
      value.forEach((v) => searchParams.append(key, String(v)));
    } else if (isObject(value)) {
      searchParams.append(key, JSON.stringify(value));
    } else {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${url}?${queryString}` : url;
};

export { buildUrlWithParams };
