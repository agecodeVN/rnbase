import React from 'react';
import { View } from 'react-native-ui-lib';
import { useFormik } from 'formik';

import { Wrapper, TextInput, Button } from 'components';
import { useSignin } from 'hooks';

const Signin = () => {
  const { doRequest: onSubmit, loading } = useSignin();

  const {
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    touched,
    errors: _errors
  } = useFormik({
    initialValues: {
      phone: '',
      password: ''
    },
    onSubmit
  });

  const handleChange = field => value => {
    setFieldValue(field, value);
    setFieldTouched(field, true, false);
  };

  const errors = name => {
    return touched[name] && _errors[name];
  };

  return (
    <Wrapper showLoading={loading}>
      <View flex centerV marginH-md>
        <TextInput
          placeholder={'phone'}
          onChangeText={handleChange('phone')}
          error={errors('phone')}
        />
        <TextInput
          placeholder={'password'}
          onChangeText={handleChange('password')}
          error={errors('password')}
        />
        <Button label={'submit'} onPress={handleSubmit} />
      </View>
    </Wrapper>
  );
};

export default Signin;
