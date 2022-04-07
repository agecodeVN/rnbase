import { stringify } from 'query-string';
import { Platform } from 'react-native';

import { API_ROOT } from 'configs/constant';
import api from 'services/axios';
import RNFetchBlob from 'rn-fetch-blob';

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

export async function fetchBlob({
  method,
  uri,
  body,
  query,
  headers,
  success,
  failure
}) {
  let _headers = { 'Content-Type': 'multipart/form-data' };
  if (!!api.defaults.headers.common.Authorization) {
    _headers['Authorization'] = api.defaults.headers.common.Authorization;
  }

  let _body = Object.keys(body)
    .map(name => {
      if (body[name] && body[name].isFile && body[name].paths) {
        return body[name].paths?.map(filePath => {
          if (!filePath) return null;
          if (Platform.OS === 'ios' && filePath.startsWith('file://'))
            filePath = filePath.replace('file://', '');
          const filename = filePath.split('/').splice(-1)[0];
          return {
            name,
            filename,
            data: RNFetchBlob.wrap(filePath)
          };
        });
      } else if (body[name] && body[name].isFile && body[name].path) {
        let filePath = body[name].path;
        if (!filePath) return null;
        if (Platform.OS === 'ios' && filePath.startsWith('file://'))
          filePath = filePath.replace('file://', '');
        const filename = filePath.split('/').splice(-1)[0];
        return {
          name,
          filename,
          data: RNFetchBlob.wrap(filePath)
        };
      } else if (
        typeof body[name] != 'object' &&
        typeof body[name] !== 'undefined'
      ) {
        return {
          name,
          data: body[name] + ''
        };
      }
      return {};
    })
    .flat()
    .filter(item => !!item.name);

  try {
    const resp = await RNFetchBlob.fetch(
      method,
      buildURL(API_ROOT + uri, query),
      {
        ..._headers,
        ...headers
      },
      _body
    );

    if (resp.respInfo.status === 200 || resp.respInfo.status === 201)
      return success?.(JSON.parse(resp.data));
    return failure?.(JSON.parse(resp.data));
  } catch (err) {
    return failure?.(err);
  }
}
