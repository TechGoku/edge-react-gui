import { asBoolean, asObject, asString } from 'cleaners'
import * as React from 'react'

import { useHandler } from '../../hooks/useHandler'
import { lstrings } from '../../locales/strings'
import { logActivity } from '../../util/logger'
import { CurrencySettingProps, maybeCurrencySetting } from '../hoc/MaybeCurrencySetting'
import { TextInputModal } from '../modals/TextInputModal'
import { Airship } from '../services/AirshipInstance'
import { SettingsHeaderRow } from '../settings/SettingsHeaderRow'
import { SettingsRadioRow } from '../settings/SettingsRadioRow'
import { SettingsSubHeader } from '../settings/SettingsSubHeader'

const asBeldexUserSettings = asObject({
  enableCustomServers: asBoolean,
  beldexLightwalletServer: asString
})
type BeldexUserSettings = ReturnType<typeof asBeldexUserSettings>

type Props = CurrencySettingProps<BeldexUserSettings, undefined>

function BeldexUserSettingsComponent(props: Props) {
  const { defaultSetting, onUpdate, setting } = props
  const { enableCustomServers, beldexLightwalletServer } = setting
  const isEmpty = beldexLightwalletServer === '' || beldexLightwalletServer === defaultSetting.beldexLightwalletServer

  const handleMyBeldex = useHandler(async (): Promise<void> => {
    await onUpdate({
      enableCustomServers: false,
      beldexLightwalletServer
    })
    logActivity(`Disable Beldex Node`)
  })

  const handleCustomServer = useHandler(async (): Promise<void> => {
    const server = await Airship.show<string | undefined>(bridge => (
      <TextInputModal
        autoCapitalize="none"
        autoCorrect={false}
        bridge={bridge}
        initialValue={beldexLightwalletServer ?? ''}
        inputLabel={lstrings.settings_custom_node_url}
        title={lstrings.settings_edit_custom_node}
      />
    ))
    if (isEmpty && server == null) return

    await onUpdate({
      enableCustomServers: true,
      beldexLightwalletServer: server ?? beldexLightwalletServer
    })
    logActivity(`Enable Beldex Node: "${server ?? beldexLightwalletServer}"`)
  })

  const customLabel = lstrings.settings_beldex_custom + (isEmpty ? '' : `:\n${beldexLightwalletServer}`)

  return (
    <>
      <SettingsHeaderRow label={lstrings.settings_beldex} />
      <SettingsSubHeader label={lstrings.settings_beldex_info} />
      <SettingsRadioRow label={lstrings.settings_beldex_default} value={!enableCustomServers} onPress={handleMyBeldex} />
      <SettingsRadioRow label={customLabel} value={enableCustomServers} onPress={handleCustomServer} />
    </>
  )
}

export const MaybeBeldexUserSettings = maybeCurrencySetting(BeldexUserSettingsComponent, asBeldexUserSettings, undefined)
