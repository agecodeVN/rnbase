import React from 'react';

/* React Native RefreshControl component flickering with useQuery
 * https://github.com/tannerlinsley/react-query/issues/2380
 */

export function useRefreshByUser(refetch) {
  const [isRefetchingByUser, setIsRefetchingByUser] = React.useState(false);

  async function refetchByUser() {
    setIsRefetchingByUser(true);

    try {
      await refetch();
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  return {
    isRefetchingByUser,
    refetchByUser
  };
}
