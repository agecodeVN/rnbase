import React from 'react';
import { Pressable } from 'react-native';
import { View, Text, Colors, Image, Typography } from 'react-native-ui-lib';
import { UIActivityIndicator } from 'react-native-indicators';

const Button = ({
  size,
  label,
  subLabel,
  style,
  textStyle,
  buttonStyle,
  onPress,
  bgColor = Colors.primary,
  children,
  radius = 20,
  iconLeft,
  iconLeftGroup = 'icons',
  iconRight,
  iconRightGroup = 'icons',
  sizeIcon = 20,
  colorIcon = Colors.white,
  textColor = Colors.white,
  unBold = false,
  disable = false,
  loading = false,
  disableIconColor = false,
  outline = false,
  border: _border = 0,
  borderColor = Colors.mainBlue,
  shadow = true,
  typography = Typography.buttonText,
  ...props
}) => {
  const bg = disable ? Colors.subBlue : outline ? textColor : bgColor;
  const color = outline ? bgColor : textColor;
  const _colorIcon = outline ? bgColor : colorIcon;
  const border = outline ? 1 : _border;

  return (
    <Pressable disabled={disable || loading} onPress={onPress}>
      {children || (
        <View
          row={!subLabel}
          center
          shadow={shadow}
          padding-xs
          radius={radius}
          backgroundColor={bg}
          customStyle={buttonStyle}
          border={border}
          borderColor={borderColor}
          width={size}
          height={size}
          {...props}>
          {!!iconLeft && (
            <Image
              size={sizeIcon}
              assetName={iconLeft}
              assetGroup={iconLeftGroup}
              tintColor={disableIconColor ? '' : _colorIcon}
            />
          )}
          {!!label && (
            <Text
              marginH-xs
              color={color}
              bold={!unBold}
              {...typography}
              customStyle={textStyle}>
              {label}
            </Text>
          )}
          {!!subLabel && (
            <Text
              marginH-xs
              color={color}
              bold={!unBold}
              {...typography}
              customStyle={textStyle}>
              {subLabel}
            </Text>
          )}
          {!!iconRight && (
            <Image
              size={sizeIcon}
              assetName={iconRight}
              assetGroup={iconRightGroup}
              tintColor={_colorIcon}
            />
          )}
        </View>
      )}
      {loading && (
        <View
          absF
          center
          radius={radius}
          backgroundColor={bg}
          customStyle={buttonStyle}
          {...props}>
          <UIActivityIndicator
            color={disable ? Colors.primary : textStyle?.color || color}
            size={textStyle?.lineHeight || 18}
          />
        </View>
      )}
    </Pressable>
  );
};

export default Button;
