import React, { useState, useImperativeHandle, forwardRef } from 'react';

import FWLoading from '../common/FWLoading';

const Loading = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show,
    update,
    hide
  }));

  const show = () => {
    setVisible(true);
  };

  const update = value => {
    setVisible(value);
  };

  const hide = () => {
    setVisible(false);
  };

  return visible && <FWLoading />;
});

export default Loading;
