import UrlParse from 'url-parse';

/**
 * search string 을 객체로 반환합니다
 */
export function parseSearch<Response extends Record<string, string | string[]>>(
  search: string,
) {
  if (search === '') {
    return {} as Response;
  }

  return search
    .slice(1, search.length)
    .split('&')
    .reduce<Response>((result, chip) => {
      const [key, value] = chip.split('=');
      const queryKey = key.trim();
      const param = value.trim();

      const queryValue = result[queryKey];

      if (Array.isArray(queryValue)) {
        return {
          ...result,
          [queryKey]: [...queryValue, param],
        };
      }

      if (queryValue != null) {
        return {
          ...result,
          [queryKey]: [queryValue, param],
        };
      }

      return {
        ...result,
        [queryKey]: param,
      };
    }, {} as Response);
}

export function parseQueryString<
  Response extends Record<string, string | string[]>,
>(_url: string) {
  const url = new UrlParse(_url);

  return parseSearch<Response>(url.query);
}
