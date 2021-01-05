class CurrencyMismatchException extends Error {
  constructor(currency: string, currencyToCheck?: string) {
    super(`${currency} is not the same as ${currencyToCheck}`)

    Object.setPrototypeOf(this, CurrencyMismatchException.prototype)
  }
}

export default CurrencyMismatchException
