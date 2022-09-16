// @flow

import * as React from 'react'
import { type TextStyle, Text as RNText, TouchableHighlight, View } from 'react-native'

import { primaryButtonUnderlay, styles } from './style.js'

export type TextProps = {
  children: React.Node,
  style?: TextStyle
}
class Text extends React.Component<TextProps> {
  render() {
    const { children, style, ...props } = this.props
    return (
      <RNText numberOfLines={1} ellipsizeMode="middle" style={[styles.buttonText, styles.primaryButtonText, style]} {...props}>
        {children}
      </RNText>
    )
  }
}

export type Props = {
  children: React.Node,
  style?: TextStyle,
  onPress?: () => mixed
}
export class PrimaryButton extends React.Component<Props> {
  static Text = Text
  render() {
    const { children, style, ...props } = this.props
    return (
      <TouchableHighlight underlayColor={primaryButtonUnderlay.color} style={[styles.button, styles.primaryButton, style]} {...props}>
        <View>{children}</View>
      </TouchableHighlight>
    )
  }
}
