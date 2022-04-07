import React from 'react';
import { TextInput, StyleSheet, Pressable } from 'react-native';
import { Colors, View, Spacings, Text, Image } from 'react-native-ui-lib';

import { t } from 'lang';
// import Fonts from 'configs/fonts';
import { IMAGE_SIZES } from 'configs/constant';

const Input = ({
  bgColor = Colors.subLightBlue,
  borderColor = Colors.subGray,
  style,
  radius = 8,
  onFocus,
  onPressIn,
  onSubmitEditing,
  inputStyle,
  placeholder,
  multiline,
  value,
  onChangeText,
  textarea,
  maxLength,
  error,
  height = 112,
  renderLeft,
  renderRight,
  keyboardType,
  secureTextEntry,
  disableBottomSpacing,
  disableHorizontalSpacing,
  flex,
  iconLeft,
  iconLeftGroup,
  iconLeftColor,
  onPressLeft,
  iconRight,
  iconRightGroup,
  iconRightColor,
  sizeIcon = IMAGE_SIZES.normal,
  onPressRight,
  letterSpacing,
  description,
  defaultValue = '',
  onBlur,
  textContentType,
  disabled = false,
  title = '',
  required = false,
  returnKeyType = 'done',
  ...props
}) => {
  if (textarea) {
    return (
      <View flex={flex} {...props}>
        {!!title && (
          <View row>
            <Text text bold marginB-xss>
              {title}
            </Text>
            {required && (
              <Text text systemRed>
                ({t('common.required')})
              </Text>
            )}
          </View>
        )}
        <View
          backgroundColor={bgColor}
          radius={radius}
          height={height}
          border={1}
          borderColor={error ? Colors.systemRed : borderColor}
          customStyle={style}>
          <TextInput
            multiline
            editable={!disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            // placeholderTextColor={Colors.fontSubGray}
            defaultValue={defaultValue}
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.input,
              styles.textArea,
              inputStyle,
              { height, backgroundColor: disabled ? Colors.subGray : bgColor }
            ]}
            onFocus={onFocus}
            onPressIn={onPressIn}
            onSubmitEditing={onSubmitEditing}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onBlur={onBlur}
            returnKeyType={returnKeyType}
            {...props}
          />
          {!!maxLength && !!value && (
            <View right marginR-xxxs marginB-xxxs>
              <Text sub subGray>
                {t('common.chars_left', { count: maxLength - value?.length })}
              </Text>
            </View>
          )}
        </View>
        {!!error && (
          <Text sub systemRed>
            {error}
          </Text>
        )}
        {!!description && (
          <Text sub subGray>
            {description}
          </Text>
        )}
      </View>
    );
  }

  const renderLeftComponent = () =>
    !!iconLeft && (
      <View marginL-md>
        <Pressable onPress={onPressLeft}>
          <Image
            size={sizeIcon}
            assetName={iconLeft}
            assetGroup={iconLeftGroup}
            tintColor={iconLeftColor}
          />
        </Pressable>
      </View>
    );

  const renderRightComponent = () =>
    !!iconRight && (
      <View marginR-md>
        <Pressable onPress={onPressRight}>
          <Image
            size={sizeIcon}
            assetName={iconRight}
            assetGroup={iconRightGroup}
            tintColor={iconRightColor}
          />
        </Pressable>
      </View>
    );

  return (
    <View flex={flex}>
      {!!title && (
        <View row>
          <Text text bold marginB-xss>
            {title}
          </Text>
          {required && (
            <Text text systemRed>
              ({t('common.required')})
            </Text>
          )}
        </View>
      )}
      <View
        flex={flex}
        row
        center
        customStyle={style}
        backgroundColor={bgColor}
        border={1}
        borderColor={error ? Colors.systemRed : borderColor}
        radius={radius}
        {...props}>
        {renderLeft || renderLeftComponent()}
        <TextInput
          editable={!disabled}
          multiline={multiline}
          defaultValue={defaultValue}
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.input,
            inputStyle,
            {
              backgroundColor: disabled ? Colors.subGray : bgColor,
              borderRadius: radius,
              letterSpacing,
              textAlignVertical: 'center'
            }
          ]}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={Colors.fontSubGray}
          onFocus={onFocus}
          onPressIn={onPressIn}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
          returnKeyType={returnKeyType}
          textContentType={textContentType}
        />
        {!!error && <Image normal assetName={'warn'} marginR-md />}
        {renderRight || renderRightComponent()}
      </View>
      {!!error && (
        <Text subText systemRed marginL-md>
          {error}
        </Text>
      )}
      {!!description && (
        <Text subText fontSubGray marginH-md marginT-xss>
          {description}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
    paddingHorizontal: Spacings.md,
    paddingVertical: Spacings.sm
    // fontFamily: Fonts.MEDIUM
    // textAlignVertical: 'top'
  },
  textArea: {
    marginVertical: Spacings.sm,
    paddingTop: Spacings.zero,
    paddingBottom: Spacings.zero,
    textAlignVertical: 'top'
  }
});

export default Input;
