import { stringify } from 'query-string';
import api from 'services/axios';

export function buildURL(url, query) {
  let _url = url;
  if (query) {
    _url += /\?/.test(url) ? '&' : '?';
    if (typeof query === 'object') {
      _url += stringify(query);
    } else {
      _url += query;
    }
  }
  return _url;
}

export async function request({
  method = 'get',
  url,
  query,
  params,
  success,
  failure,
  headers
}) {
  const axiosMethod = api[method];
  if (typeof axiosMethod === 'function') {
    try {
      const result =
        method === 'get'
          ? await axiosMethod(buildURL(url, query), { headers })
          : await axiosMethod(buildURL(url, query), params, { headers });

      if (result.status === 200 || result.status === 201) {
        if (typeof success === 'function') {
          return success(result.data);
        }
        return result;
      }
      throw result;
    } catch (err) {
      if (typeof failure === 'function') {
        return failure({ message: err?.message });
      }
      console.error(err);
    }
  }
}
