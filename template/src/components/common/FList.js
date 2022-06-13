import React, { useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Spacings, View, Text, Image, Colors } from 'react-native-ui-lib';
import { useScrollToTop } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRefreshByUser } from 'hooks';
import { AfterInteraction } from 'components';
import isEqual from 'react-fast-compare';
import { UIActivityIndicator } from 'react-native-indicators';

const FList = ({
  keyId = 'id',
  useSafeArea = false,
  data,
  refetch,
  loadMore,
  isFetching,
  hasNextPage,
  isSuccess,
  renderItem,
  renderEmpty,
  renderFooter,
  renderHeader,
  contentContainerStyle,
  textEmpty = '',
  showEmptyIcon = true,
  ...props
}) => {
  const flatlistRef = useRef(null);
  const { bottom } = useSafeAreaInsets();

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
  const windowSize = data?.length > 50 ? data.length / 4 : 21;

  useScrollToTop(flatlistRef);

  const ListEmptyComponent = () => {
    if (renderEmpty) {
      return renderEmpty;
    }
    return (
      <View flex center>
        {showEmptyIcon && <Image empty assetName={'empty'} />}
        <Text marginV-xl bold>
          {textEmpty}
        </Text>
      </View>
    );
  };

  const ListFooterComponent = () => {
    if (renderFooter) {
      return renderFooter;
    }

    return (
      hasNextPage && (
        <View paddingT-md>
          <UIActivityIndicator color={Colors.primary} />
        </View>
      )
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
        ListEmptyComponent={isSuccess && ListEmptyComponent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onRefresh={refetchByUser}
        refreshing={isRefetchingByUser}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={[
          useSafeArea && { paddingBottom: bottom + Spacings.md },
          styles.container,
          contentContainerStyle
        ]}
        maxToRenderPerBatch={windowSize}
        windowSize={windowSize}
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
