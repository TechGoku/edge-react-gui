import * as React from 'react'

import { useSelector } from '../../types/reactRedux'
import { SceneButtons } from '../common/SceneButtons'
import { SceneWrapper } from '../common/SceneWrapper'
import { FilledTextInput } from '../themed/FilledTextInput'

interface Props {}

export function ChangeUsernameScene(props: Props) {
  const account = useSelector(state => state.core.account)

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handlePress = async () => {
    await account.changeUsername({
      username,
      password: password === '' ? undefined : password
    })
  }

  return (
    <SceneWrapper>
      <FilledTextInput placeholder="new username" value={username} onChangeText={setUsername} aroundRem={1} />
      <FilledTextInput placeholder="password" value={password} onChangeText={setPassword} aroundRem={1} autoFocus={false} />
      <SceneButtons
        primary={{
          label: 'submit',
          onPress: handlePress
        }}
      />
    </SceneWrapper>
  )
}
