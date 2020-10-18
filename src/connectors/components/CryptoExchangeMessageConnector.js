// @flow

import { connect } from 'react-redux'

import s from '../../locales/strings.js'
import { type Props, CryptoExchangeMessageBoxComponent } from '../../modules/UI/components/CryptoExchangeMessageBox/CryptoExchangeMessageBoxComponent'
import { type RootState } from '../../types/reduxTypes.js'

type OwnProps = {}

const mapStateToProps = (state: RootState, ownProps: OwnProps): Props => {
  const insufficient = state.cryptoExchange.insufficientError
  const genericError = state.cryptoExchange.genericShapeShiftError
  const fromWallet = state.cryptoExchange.fromWallet
  const fromCurrencyCode = state.cryptoExchange.fromCurrencyCode

  let useErrorStyle = false
  let message = ''

  if (genericError) {
    useErrorStyle = true
    message = genericError
  } else if (insufficient) {
    useErrorStyle = true
    message = s.strings.fragment_insufficient_funds
  } else if (fromWallet && fromCurrencyCode) {
    message = state.cryptoExchange.fromBalanceMessage
  }

  return {
    message,
    useErrorStyle
  }
}

export default connect(mapStateToProps, null)(CryptoExchangeMessageBoxComponent)
