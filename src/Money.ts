import { round, ROUNDING_MODES } from './Calculation'
import { parseCurrencyString } from './Currency'

import CurrencyMismatchException from './exception/CurrencyMismatchException'

export default class Money {
  private amount: number
  private currency: string
  private precision: number
  private locale: string

  constructor(amount: number, currency: string, precision = 2) {
    this.amount = amount
    this.currency = currency
    this.precision = precision
    this.locale = undefined
  }

  toString(): string {
    return this.toDecimal().toString()
  }

  toObject(): { amount: number, currency: string, precision: number, locale: string } {
    return {
      amount: this.amount,
      currency: this.currency,
      precision: this.precision,
      locale: this.locale || null,
    }
  }

  toJSON(): number {
    return this.getAmount()
  }

  /**
   * Parse monetary string value
   * @param string input
   * @param string currency
   */
  static fromString(input: string, currency: string) {
    const amount = parseCurrencyString(input, currency)
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

  toDecimal(): number {
    return this.getAmount() / Math.pow(10, this.precision)
  }

  toLocaleString(): string {
    const options = {
      style: 'currency',
      currency: this.getCurrency(),
    }

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
