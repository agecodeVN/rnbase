import React, { useState, useEffect } from 'react';
import { InteractionManager } from 'react-native';
import { View } from 'react-native-ui-lib';
import { UIActivityIndicator } from 'react-native-indicators';

const AfterInteraction = ({
  disableAnimation,
  fade,
  children,
  skeleton,
  forceShow,
  ...props
}) => {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFinished(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setFinished(true);
    });
  }, []);

  const defaultSkeleton = () => (
    <View flex center background-grey90>
      <UIActivityIndicator size={24} color={'rgba(0, 0, 0, .3)'} />
    </View>
  );

  const renderSkeleton = () =>
    skeleton || (!disableAnimation && defaultSkeleton());

  return (
    <View flex {...props}>
      {(finished && !forceShow && children) || renderSkeleton()}
    </View>
  );
};

export default AfterInteraction;
