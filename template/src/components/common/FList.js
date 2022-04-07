import React, { useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Spacings, View, Text, Image } from 'react-native-ui-lib';
import { useScrollToTop } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRefreshByUser } from 'hooks';
import { AfterInteraction } from 'components';
import isEqual from 'react-fast-compare';

const FList = ({
  keyId = 'id',
  useSafeArea = false,
  data,
  refetch,
  loadMore,
  isFetching,
  hasNextPage,
  renderItem,
  renderEmpty,
  renderFooter,
  renderHeader,
  contentContainerStyle,
  textEmpty = '',
  ...props
}) => {
  const flatlistRef = useRef(null);
  const { bottom } = useSafeAreaInsets();

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  useScrollToTop(flatlistRef);

  const ListEmptyComponent = () => {
    if (renderEmpty) {
      return renderEmpty;
    }
    return (
      <View flex center>
        <Image alert assetName={'none_result'} assetGroup={'alert'} />
        <Text marginV-xl bold>
          {textEmpty}
        </Text>
      </View>
    );
  };

  return (
    <AfterInteraction
      forceShow={isFetching && !data?.length && !isRefetchingByUser}>
      <FlatList
        ref={flatlistRef}
        keyExtractor={item => item[keyId]}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onRefresh={refetchByUser}
        refreshing={isRefetchingByUser}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={hasNextPage && renderFooter}
        contentContainerStyle={[
          useSafeArea && { paddingBottom: bottom + Spacings.md },
          styles.container,
          contentContainerStyle
        ]}
        {...props}
      />
    </AfterInteraction>
  );
};

export default React.memo(FList, isEqual);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
});
