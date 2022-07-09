// @flow

import s from '../../../locales/strings.js'
import { type NavigationProp, type RouteProp } from '../../../types/routerTypes.js'
import { ManageCollateralScene } from './ManageCollateralScene.js'

type Props = {
  navigation: NavigationProp<'loanWithdrawCollateralScene'>,
  route: RouteProp<'loanWithdrawCollateralScene'>
}

export const LoanWithdrawCollateralScene = (props: Props) => {
  const { navigation, route } = props
  const { borrowEngine } = route.params

  return ManageCollateralScene({
    borrowEngine,
    defaultTokenId: borrowEngine.collaterals[0].tokenId,
    action: async req => await borrowEngine.withdraw(req),
    actionWallet: 'toWallet',
    ltvType: 'collaterals',
    ltvChange: 'increase',

    showExchangeRateTile: true,
    showTotalDebtTile: true,
    showTotalCollateralTile: true,

    headerText: s.strings.loan_withdraw_collateral,
    goBack: () => navigation.pop()
  })
}
