import { round, ROUNDING_MODES } from './Calculation'
import { getExponent, parseCurrencyString } from './Currency'

import CurrencyMismatchException from './exception/CurrencyMismatchException'

/**
 * @param amount The quantity of money as an integer in the subunit of the currency (e.g. 1050 for £10.50)
 * @param currency The alphabetic currency code as defined by ISO 4217 (e.g. GBP for Sterling)
 * @param exponent The number of decimal places the currency supports (e.g. 2 for Sterling)
 * @param locale The BCP 47 language tag for the locale to use when formatting (e.g. en-GB)
 */
export default class Money {
  private amount: number
  private currency: string
  private exponent: number
  private locale: string

  constructor(amount: number, currency: string, exponent = getExponent(currency)) {
    this.amount = amount
    this.currency = currency
    this.exponent = exponent
    this.locale = undefined
  }

  toString(): string {
    return this.toDecimal().toString()
  }

  toObject(): { amount: number, currency: string, exponent: number, locale: string } {
    return {
      amount: this.amount,
      currency: this.currency,
      exponent: this.exponent,
      locale: this.locale || null,
    }
  }

  toJSON(): number {
    return this.getAmount()
  }

  /**
   * Create a Money object from a string representation of the amount of money
   * @param mainAmount The quantity of money as a string in the main unit of the currency (e.g. '10.50' for £10.50)
   * @param currency The alphabetic currency code as defined by ISO 4217 (e.g. GBP for Sterling)
   */
  static fromString(mainAmount: string, currency: string): Money {
    const amount = parseCurrencyString(mainAmount, currency)
    return new Money(amount, currency)
  }

  getAmount(): number {
    return this.amount
  }

  getCurrency(): string {
    return this.currency
  }

  getLocale(): string {
    return this.locale
  }

  setLocale(locale: string): Money {
    this.locale = locale
    return this
  }

  /**
   * @returns The amount of money in the main unit of the currency
   */
  toDecimal(): number {
    return this.getAmount() / Math.pow(10, this.exponent)
  }

  /**
   * @returns A string representation of the amount of money formatted according to the locale and currency
   */
  toLocaleString(): string {
    const options = {
      style: 'currency',
      currency: this.getCurrency(),
    }
    // Note that toLocaleString() will use the locale of the calling context if none is specified
    return this.toDecimal().toLocaleString(this.getLocale(), options)
  }

  add(money: Money): Money {
    if (!this.currenciesMatch(this, money)) {
      throw new CurrencyMismatchException(this.getCurrency(), money.getCurrency())
    }

    return new Money(this.getAmount() + money.getAmount(), this.getCurrency())
  }

  subtract(money: Money): Money {
    if (!this.currenciesMatch(this, money)) {
      throw new CurrencyMismatchException(this.getCurrency(), money.getCurrency())
    }

    return new Money(this.getAmount() - money.getAmount(), this.getCurrency())
  }

  multiply(multiplier: number, mode = ROUNDING_MODES.ROUND_HALF_EVEN): Money {
    return new Money(round(this.getAmount() * multiplier, mode), this.getCurrency())
  }

  divide(divisor: number, mode = ROUNDING_MODES.ROUND_HALF_EVEN): Money {
    return new Money(round(this.getAmount() / divisor, mode), this.getCurrency())
  }

  private currenciesMatch(moneyA: Money, moneyB: Money): boolean {
    return moneyA.getCurrency() === moneyB.getCurrency()
  }
}
