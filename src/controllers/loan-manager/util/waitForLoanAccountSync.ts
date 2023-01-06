import { EdgeCurrencyWallet } from 'edge-core-js'

import { BorrowEngine } from '../../../plugins/borrow-plugins/types'

// Wait for borrow engine to fully sync
export const waitForBorrowEngineSync = async (borrowEngine: BorrowEngine) => {
  if (!borrowEngine.isRunning) throw new Error(`Waiting for borrow engine before it has been started.`)
  await new Promise<void>(resolve => {
    if (borrowEngine.syncRatio >= 1) return resolve()
    borrowEngine.watch('syncRatio', syncRatio => {
      if (syncRatio >= 1) resolve()
    })
  })
}

export const waitForWalletSync = async (wallet: EdgeCurrencyWallet) => {
  await new Promise<void>(resolve => {
    if (wallet.syncRatio >= 1) return resolve()
    wallet.watch('syncRatio', syncRatio => {
      if (syncRatio >= 1) resolve()
    })
  })
}
