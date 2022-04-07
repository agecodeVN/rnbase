import React, { useState } from 'react';
import { View } from 'react-native-ui-lib';

const NavBar = ({ children, ...props }) => {
  const [minWidth, setMinWidth] = useState(0);

  const onLayout = event => {
    const layoutWidth = event.nativeEvent?.layout?.width;
    if (layoutWidth) {
      setMinWidth(prev => Math.max(prev, layoutWidth));
    }
  };

  return (
    <View row {...props}>
      <View onLayout={onLayout} minWidth={minWidth}>
        {children?.[0]}
      </View>
      {children?.[1]}
      <View onLayout={onLayout} minWidth={minWidth}>
        {children?.[2]}
      </View>
    </View>
  );
};

export default NavBar;
