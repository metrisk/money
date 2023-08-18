import Money from '../../Money'

describe('Money', () => {
  it('should instantiate with a valid amount', () => {
    const money = new Money(1000, 'GBP')
    expect(money).toBeInstanceOf(Money)
  })

  it('should get the amount', () => {
    const money = new Money(1000, 'GBP')
    expect(money.getAmount()).toStrictEqual(1000)
  })

  it('should get the currency', () => {
    const money = new Money(1000, 'GBP')
    expect(money.getCurrency()).toStrictEqual('GBP')
  })

  it('should get the amount as a decimal', () => {
    const money = new Money(2153, 'GBP')
    expect(money.toDecimal()).toStrictEqual(21.53)
  })

  it('should get the amount as a decimal with a non-two minor unit fraction', () => {
    const money = new Money(2153, 'JPY')
    expect(money.toDecimal()).toStrictEqual(2153)
  })

  it('should get the amount as a locale formatted string', () => {
    const money = new Money(2153, 'GBP')
    expect(money.toLocaleString()).toStrictEqual('£21.53')
  })

  it('should add money', () => {
    const moneyA = Money.fromString('22.12', 'GBP')
    const moneyB = new Money(10, 'GBP')
    const money = moneyA.add(moneyB)

    expect(money.getAmount()).toStrictEqual(2222)
    expect(money.toDecimal()).toStrictEqual(22.22)
  })

  it('should subtract money', () => {
    const moneyA = Money.fromString('22.12', 'GBP')
    const moneyB = new Money(10, 'GBP')
    const money = moneyA.subtract(moneyB)

    expect(money.getAmount()).toStrictEqual(2202)
    expect(money.toDecimal()).toStrictEqual(22.02)
  })

  it('should multiply money', () => {
    const money = (new Money(1503, 'GBP').multiply(7))

    expect(money.getAmount()).toStrictEqual(10521)
    expect(money.toDecimal()).toStrictEqual(105.21)
  })

  it('should divide money', () => {
    const money = (new Money(1503, 'GBP').divide(3))

    expect(money.getAmount()).toStrictEqual(501)
    expect(money.toDecimal()).toStrictEqual(5.01)
  })

  it('should parse a currency string and return a Money instance', () => {
    const money = Money.fromString('2200.12', 'GBP')

    expect(money.getAmount()).toStrictEqual(220012)
    expect(money.getCurrency()).toStrictEqual('GBP')
    expect(money.toDecimal()).toStrictEqual(2200.12)
    expect(money.toLocaleString()).toStrictEqual('£2,200.12')
  })

  it('should return non-GBP currencies with correct locale formatting', () => {
    const money = Money.fromString(1000, 'JPY').setLocale('ja')

    expect(money.toLocaleString()).toStrictEqual('￥1,000')
  })

  it('should return a decimal string when coerced to a string', () => {
    const money = Money.fromString('22.12', 'GBP')

    expect(money.toString()).toStrictEqual('22.12')
  })

  it('should return an object when coerced to an object', () => {
    const money = Money.fromString('22.12', 'GBP')

    expect(money.toObject()).toStrictEqual({ amount:2212, currency: 'GBP', locale: null, exponent: 2 })
  })

  it('should return the amount when coerced to json', () => {
    const money = Money.fromString('22.12', 'GBP')

    expect(JSON.stringify(money)).toStrictEqual("2212")
    expect(JSON.stringify({ money })).toStrictEqual("{\"money\":2212}")
  })
})