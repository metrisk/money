class InvalidMonetaryAmountException extends Error {
  constructor(amount: string | number, currency?: string) {
    super(`${amount} is not a valid amount for ${currency}`)

    Object.setPrototypeOf(this, InvalidMonetaryAmountException.prototype)
  }
}

export default InvalidMonetaryAmountException
