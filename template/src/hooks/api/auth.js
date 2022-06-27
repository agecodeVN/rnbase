import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { usePrevious } from 'hooks';
import { SIGNIN, LOGOUT, GET_ME, UPDATE_ME } from 'actions';
import Navigator from 'navigations/navigator';

const afterLoggedIn = () => {
  Navigator.reset('TabNavigation');
};

export function useSignin() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const prevLoading = usePrevious(auth.loading?.[SIGNIN.BASE]);

  const doRequest = async requestBody => {
    setLoading(true);
    dispatch(SIGNIN.REQUEST(requestBody));
  };

  useEffect(() => {
    if (prevLoading && !auth.loading[SIGNIN.BASE]) {
      if (auth.success[SIGNIN.BASE]) {
        afterLoggedIn(auth?.user);
      }
      setLoading(false);
    }
  }, [auth, prevLoading]);

  return {
    data: auth,
    loading,
    prevLoading,
    doRequest
  };
}

export function useLogout() {
  const dispatch = useDispatch();

  const doRequest = () => {
    dispatch(LOGOUT());
    Navigator.reset('Signin');
  };

  return {
    doRequest
  };
}

export function useGetMe() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const auth = useSelector(state => state.auth);
  const prevLoading = usePrevious(auth.loading?.[GET_ME.BASE]);

  const doRequest = () => {
    setLoading(true);
    dispatch(GET_ME.REQUEST());
  };

  useEffect(() => {
    if (prevLoading && !auth.loading?.[GET_ME.BASE]) {
      setLoading(false);
    }
  }, [auth.loading, prevLoading]);

  return {
    doRequest,
    loading,
    prevLoading
  };
}

export function useUpdateMe() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const auth = useSelector(state => state.auth);
  const prevLoading = usePrevious(auth.loading?.[UPDATE_ME.BASE]);

  const doRequest = requestBody => {
    setLoading(true);
    dispatch(UPDATE_ME.REQUEST(requestBody));
  };

  useEffect(() => {
    if (prevLoading && !auth.loading?.[UPDATE_ME.BASE]) {
      if (auth.success[UPDATE_ME.BASE]) {
        // Navigator.goBack();
      }
      setLoading(false);
    }
  }, [auth.loading, prevLoading]);

  return {
    doRequest,
    loading,
    prevLoading,
    data: auth
  };
}
