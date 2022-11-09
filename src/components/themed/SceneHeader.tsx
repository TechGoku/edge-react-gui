import * as React from 'react'
import { View, ViewStyle } from 'react-native'

import { Space } from '../layout/Space'
import { cacheStyles, Theme, useTheme } from '../services/ThemeContext'
import { DividerLine } from './DividerLine'
import { EdgeText } from './EdgeText'

interface Props {
  title?: string
  children?: React.ReactNode
  tertiary?: React.ReactNode
  underline?: boolean
  withTopMargin?: boolean
  style?: ViewStyle
}

export const SceneHeaderComponent = (props: Props) => {
  const { title, underline, withTopMargin, children, tertiary = null, style } = props
  const theme = useTheme()
  const styles = getStyles(theme)
  return (
    <>
      <View style={[styles.container, withTopMargin ? styles.topMargin : null, style]}>
        {title ? <EdgeText style={styles.title}>{title}</EdgeText> : null}
        {children}
        {tertiary ? <Space right>{tertiary}</Space> : null}
      </View>
      <View style={styles.dividerLine}>{underline ? <DividerLine /> : null}</View>
    </>
  )
}

const getStyles = cacheStyles((theme: Theme) => ({
  container: {
    marginLeft: theme.rem(1),
    paddingBottom: theme.rem(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topMargin: {
    marginTop: theme.rem(1)
  },
  dividerLine: {
    marginLeft: theme.rem(1),
    marginBottom: theme.rem(0.5)
  },
  title: {
    fontSize: theme.rem(1.2),
    fontFamily: theme.fontFaceMedium
  }
}))

export const SceneHeader = React.memo(SceneHeaderComponent)
