import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';
import { TabView as RNTabView, TabBar, SceneMap } from 'react-native-tab-view';

const TabView = ({
  sceneMap,
  swipeDisabled,
  scrollEnabled,
  onIndexChange,
  onKeyChange,
  shadow,
  routes,
  widthTabbar,
  minWidthLabel = 120,
  showShadow,
  useCustomScenceMap = false,
  index: _index = 0,
  ...props
}) => {
  const [index, setIndex] = useState(_index);

  const _onIndexChange = i => {
    onIndexChange?.(i);
    onKeyChange?.(routes[i]?.key);
    setIndex(i);
  };

  const [routesState] = useState(routes);

  const renderScene = ({ route }) => {
    let Component = sceneMap[route.key];
    const currentRoute = routes[index]?.key;

    return (
      <Component currentIndex={index} currentRoute={currentRoute} {...props} />
    );
  };

  const _renderScene = SceneMap(sceneMap);

  const renderLabel = ({ route, focused, color }) => (
    <View center minWidth={minWidthLabel}>
      <Text color={color} bold={focused}>
        {route?.title}
      </Text>
    </View>
  );

  const renderTabBar = p => (
    <View
      paddingH-md
      background-white
      shadow={shadow}
      customStyle={styles.wrapper}>
      <TabBar
        {...p}
        scrollEnabled={scrollEnabled}
        tabStyle={[styles.tabStyle, { width: widthTabbar }]}
        style={styles.tabBar}
        activeColor={Colors.mainBlack}
        inactiveColor={Colors.fontSubGray}
        renderLabel={renderLabel}
        indicatorStyle={styles.indicator}
      />
    </View>
  );
  return (
    <RNTabView
      swipeEnabled={!swipeDisabled}
      navigationState={{ index, routes: routesState }}
      renderScene={useCustomScenceMap ? renderScene : _renderScene}
      onIndexChange={_onIndexChange}
      renderTabBar={renderTabBar}
      style={showShadow && styles.shadow}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderBottomColor: Colors.subBlue,
    borderBottomWidth: 1,
    marginVertical: 0,
    elevation: 0,
    shadowOpacity: 0
  },
  tabStyle: {
    paddingBottom: -5
  },
  indicator: {
    backgroundColor: Colors.mainBlue,
    height: 2,
    marginBottom: -1
  },
  wrapper: {
    marginTop: -10
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 1
  }
});

export default TabView;
