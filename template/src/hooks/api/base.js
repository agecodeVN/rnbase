import { useCallback } from 'react';
import { useInfiniteQuery } from 'react-query';
import api from 'services/axios';
import { buildURL, isEmpty } from 'utils';
import { DEFAULT_PAGE_SIZE, STALE_TIME } from 'configs/constants';

const fetcher = async ({ url, query } = {}) => {
  const { page, pageSize = DEFAULT_PAGE_SIZE, ...rest } = query || {};
  const URL = buildURL(url, {
    page: page || 0,
    pageSize,
    ...rest
  });
  const response = await api.get(URL);
  return response.data;
};

/**
 *
 * @param {string} queryURL
 * @param {string} queryKey
 * @param {object} defaultQuery
 * @param {object} options
 * @returns
 */

const useInfinite = (
  queryURL,
  queryKey,
  defaultQuery = {},
  options = {},
  field
) => {
  const _queryKey = Array.isArray(queryKey)
    ? queryKey
    : [queryKey, { ...defaultQuery }];
  const result = useInfiniteQuery(
    _queryKey,
    ({ pageParam = 0 }) => {
      return fetcher({
        url: queryURL,
        query: { page: pageParam, ...defaultQuery }
      });
    },
    {
      select: data => {
        if (!isEmpty(data) && data?.pages?.[0]) {
          const pagesData =
            data?.pages
              ?.map(item => {
                if (item?.results) {
                  return [...item?.results];
                }
                return null;
              })
              .filter(Boolean) || [];

          return {
            ...data,
            total: data?.pages?.[data?.pages?.length - 1]?.totalPages || 0,
            currentPage: data?.pages?.[data?.pages?.length - 1]?.currentPage,
            pages: [].concat(...pagesData),
            unread: data?.pages?.[data?.pages?.length - 1]?.unread || 0,
            [field]: data?.pages?.[data?.pages?.length - 1]?.[field]
          };
        }
        return {};
      },

      getNextPageParam: lastPage =>
        lastPage?.hasNextPage ||
        lastPage?.currentPage < lastPage?.totalPages - 1
          ? lastPage?.currentPage + 1
          : false,
      staleTime: STALE_TIME,
      ...options
    }
  );

  const { hasNextPage, fetchNextPage } = result;

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage]);

  return {
    ...result,
    total: result?.data?.total,
    data: result?.data?.pages?.filter(Boolean),
    currentPage: result?.data?.currentPage || 0,
    unread: result?.data?.unread,
    [field]: result?.data?.[field],
    loadMore
  };
};

const post = async ({ url, data }) => {
  const response = await api.post(url, data);
  return response?.data;
};

const usePostInfinite = (
  queryURL,
  queryKey,
  defaultQuery = {},
  options = {},
  field
) => {
  const _queryKey = Array.isArray(queryKey)
    ? queryKey
    : [queryKey, { ...defaultQuery }];
  const result = useInfiniteQuery(
    _queryKey,
    ({ pageParam = 0 }) => {
      return post({
        url: queryURL,
        data: { page: pageParam, ...defaultQuery }
      });
    },
    {
      select: data => {
        if (!isEmpty(data) && data?.pages?.[0]) {
          const pagesData =
            data?.pages
              ?.map(item => {
                if (item?.results) {
                  return [...item?.results];
                }
                return null;
              })
              .filter(Boolean) || [];

          return {
            ...data,
            totalDocs: data?.pages?.[data?.pages?.length - 1]?.total || 0,
            currentPage: data?.pages?.[data?.pages?.length - 1]?.currentPage,
            pages: [].concat(...pagesData),
            unread: data?.pages?.[data?.pages?.length - 1]?.unread || 0,
            [field]: data?.pages?.[data?.pages?.length - 1]?.[field]
          };
        }

        return {};
      },

      getNextPageParam: lastPage =>
        lastPage?.hasNextPage ||
        lastPage?.currentPage < lastPage?.totalPages - 1
          ? lastPage?.currentPage + 1
          : false,
      staleTime: STALE_TIME,
      ...options
    }
  );

  const { hasNextPage, fetchNextPage } = result;

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage]);

  return {
    ...result,
    totalDocs: result?.data?.totalDocs,
    data: result?.data?.pages?.filter(Boolean),
    currentPage: result?.data?.currentPage || 0,
    unread: result?.data?.unread,
    [field]: result?.data?.[field],
    loadMore
  };
};

export { fetcher, useInfinite, usePostInfinite };
