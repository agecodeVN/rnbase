import {
  CommonActions,
  DrawerActions,
  StackActions
} from '@react-navigation/native';
import { createRef } from 'react';

export const navigationRef = createRef();
export const isReadyRef = createRef();

function setContainer(container) {
  navigationRef.current = container;
  isReadyRef.current = true;
}

const parentState = (state, parent) => {
  const { index, routes } = state;
  const currentRoute = routes[index];
  if (currentRoute.state) {
    return parentState(currentRoute.state, currentRoute.state);
  }
  return parent;
};

function popToTop() {
  if (navigationRef.current?.getRootState?.()?.index !== 0) {
    navigationRef.current?.dispatch(StackActions.popToTop());
  }
}

function reset(name, params, key) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name,
          params,
          key
        }
      ]
    })
  );
}

function goBack() {
  navigationRef.current?.dispatch(CommonActions.goBack());
}

function navigate(name, params, key) {
  if (navigationRef.current) {
    navigationRef.current?.dispatch(
      CommonActions.navigate({
        name,
        params,
        key
      })
    );
  }
}

function navigateDeep(actions) {
  navigationRef.current?.dispatch(
    actions.reduceRight(
      (prevAction, action) =>
        CommonActions.navigate({
          name: action.name,
          params: action.params,
          action: prevAction
        }),
      undefined
    )
  );
}

function replace(name, params, key) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(
      StackActions.replace({
        name,
        params,
        key
      })
    );
  }
}

function push(name, params, key) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.push(name, params));
  }
}

function replaceSecond(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(state => {
      if (state.routes?.length > 1) {
        return CommonActions.reset({
          ...state,
          routes: [
            state.routes[0],
            {
              name,
              params
            }
          ],
          index: 1
        });
      } else {
        return CommonActions.navigate({
          name,
          params
        });
      }
    });
  }
}

function replaceLast(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(state => {
      if (state.routes?.length > 1) {
        return CommonActions.reset({
          ...state,
          routes: [
            ...state.routes.slice(0, -1),
            {
              name,
              params
            }
          ],
          index: state.routes.length - 1
        });
      } else {
        return CommonActions.navigate({
          name,
          params
        });
      }
    });
  }
}

function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

function getCurrentRoute() {
  return navigationRef.current.getCurrentRoute();
}

const Navigator = {
  setContainer,
  popToTop,
  navigateDeep,
  navigate,
  reset,
  goBack,
  getCurrentRoute,
  replace,
  replaceSecond,
  replaceLast,
  push,
  toggleDrawer
};

if (__DEV__) {
  Object.keys(Navigator).forEach(value => {
    const _func = Navigator[value];
    if (
      typeof _func === 'function' &&
      value !== 'goBack' &&
      value !== 'setContainer' &&
      value !== 'toggleDrawer'
    ) {
      Navigator[value] = (...args) => {
        console.log(value, ...args);
        _func(...args);
      };
    }
  });
}

export default Navigator;

export { getCurrentRoute };
