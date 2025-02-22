import React from 'react'

import { BSPaymentTypes, FiatType, OrderType } from '@core/types'

import { Props as OwnProps, SuccessStateType } from '.'
import Checkout from './Checkout'
import Unsupported from './template.unsupported'

const Success = (props: Props) => {
  const isUserEligible =
    props.paymentMethods.methods.length &&
    props.paymentMethods.methods.find(
      (method) => method.limits?.max !== '0' && method.currency === props.fiatCurrency
    )

  // Check to see if user can sell into their wallet's preferred currency
  // Handles the case where we support credit card buy for the currency but not sell, i.e. CAD
  const sellCurrencyAvailable =
    props.orderType === OrderType.BUY ||
    (props.orderType === OrderType.SELL &&
      props.paymentMethods.methods
        .filter((method) => method.type === BSPaymentTypes.FUNDS)
        .map((method) => method.currency)
        .includes(props.walletCurrency))

  return isUserEligible && sellCurrencyAvailable ? (
    <Checkout {...props} />
  ) : (
    <Unsupported {...props} />
  )
}

export type Props = OwnProps & SuccessStateType & { cryptoCurrency: string; fiatCurrency: FiatType }

export default Success
