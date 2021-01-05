import { parseCurrencyString } from '../../Currency'
import InvalidMonetaryAmountException from '../../exception/InvalidMonetaryAmountException'

describe('Currency', () => {
  describe('parseCurrencyString', () => {
    describe('valid amounts', () => {
      describe('currencies with an exponent of 0', () => {
        it('returns an appropriate lowest sub unit value and display value when the amount contains unexpected characters', () => {
          expect(parseCurrencyString('¥100 JPY?', 'JPY')).toEqual(100)
        })

        it('returns the correct lowest sub unit value and display value for a whole amount', () => {                
          expect(parseCurrencyString('1', 'JPY')).toEqual(1)
        })

        it('returns the correct lowest sub unit value and display value for a thousand amount', () => {
          expect(parseCurrencyString('1,050', 'JPY')).toEqual(1050)
        })

        it('returns the correct lowest sub unit value and display value for a thousand amount with an alternative separator', () => {
          expect(parseCurrencyString('1.050', 'JPY')).toEqual(1050)
        })
      })

      describe('currencies with an exponent of 2', () => {
        it('returns an apropriate lowest sub unit value and display value when the amount contains unexpected characters', () => {
          expect(parseCurrencyString('£100 pounds?', 'GBP')).toEqual(10000)
        })

        it('returns the correct lowest sub unit value and display value for a whole amount', () => {
          expect(parseCurrencyString('1', 'GBP')).toEqual(100)
        })

        it('returns the correct lowest sub unit value and display value for a decimal amount', () => {
          expect(parseCurrencyString('1.50', 'GBP')).toEqual(150)
        })
        
        it('returns the correct lowest sub unit value and display value for a thousand amount', () => {
          expect(parseCurrencyString('1,050', 'GBP')).toEqual(105000)
        })

        it('returns the correct lowest sub unit value and display value for a thousand amount with an alternative separator', () => {
          expect(parseCurrencyString('1.050', 'GBP')).toEqual(105000)
        })

        it('returns the correct lowest sub unit value and display value for a decimal thousand amount', () => {
          expect(parseCurrencyString('1,050.50', 'GBP')).toEqual(105050)
        })

        it('returns the correct lowest sub unit value and display value for a decimal thousand amount with alternaive separators', () => {
          expect(parseCurrencyString('1.050,50', 'GBP')).toEqual(105050)
        })

        it('returns the correct lowest sub unit value and display value for a decimal amount with a missing leading 0', () => {
          expect(parseCurrencyString('.50', 'GBP')).toEqual(50)
        })

      })

      describe('currencies with an exponent of 3', () => {
        it('returns an apropriate lowest sub unit value and display value when the amount contains unexpected characters', () => {
          expect(parseCurrencyString('B100 BHD?', 'BHD')).toEqual(100000)
        })

        it('returns the correct lowest sub unit value and display value for a whole amount', () => {
          expect(parseCurrencyString('1', 'BHD')).toEqual(1000)
        })

        it('returns the correct lowest sub unit value and display value for a decimal amount', () => {
          expect(parseCurrencyString('1.500', 'BHD')).toEqual(1500)
        })
        
        it('returns the correct lowest sub unit value and display value for a thousand amount', () => {
          expect(parseCurrencyString('1,050', 'BHD')).toEqual(1050000)
        })

        it('returns the correct lowest sub unit value and display value for a decimal thousand amount', () => {
          expect(parseCurrencyString('1,050.500', 'BHD')).toEqual(1050500)
        })

        it('returns the correct lowest sub unit value and display value for a decimal amount with a missing leading 0', () => {
          expect(parseCurrencyString('.500', 'BHD')).toEqual(500)
        })
      })

      describe('currencies with an exponent of 4', () => {
        it('returns an apropriate lowest sub unit value and display value when the amount contains unexpected characters', () => {
          expect(parseCurrencyString('C100 CFL?', 'CLF')).toEqual(1000000)
        })
        
        it('It returns the correct lowest sub unit value and display value for a whole amount', () => {
          expect(parseCurrencyString('1', 'CLF')).toEqual(10000)
        })

        it('returns the correct lowest sub unit value and display value for a decimal amount', () => {
          expect(parseCurrencyString('1.5050', 'CLF')).toEqual(15050)
        })
        
        it('returns the correct lowest sub unit value and display value for a thousand amount', () => {
          expect(parseCurrencyString('1,050', 'CLF')).toEqual(10500000)
        })

        it('returns the correct lowest sub unit value and display value for a thousand amount with an alternative separator', () => {
          expect(parseCurrencyString('1.050', 'CLF')).toEqual(10500000)
        })

        it('returns the correct lowest sub unit value and display value for a decimal thousand amount', () => {
          expect(parseCurrencyString('1,050.5050', 'CLF')).toEqual(10505050)
        })

        it('returns the correct lowest sub unit value and display value for a decimal thousand amount with alternaive separators', () => {
          expect(parseCurrencyString('1.050,5050', 'CLF')).toEqual(10505050)
        })

        it('returns the correct lowest sub unit value and display value for a decimal amount with a missing leading 0', () => {
          expect(parseCurrencyString('.5050', 'CLF')).toEqual(5050)
        })
      })

    })

    describe('invalid amounts', () => {
      it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount has no parsable value', () => {
        expect(() => parseCurrencyString('a fiver i think !?', 'BGP')).toThrow(InvalidMonetaryAmountException)
      })

      describe('currencies with an exponent of 0', () => {
        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount has too few digits after the separator to be a thousand amount', () => {
          expect(() => parseCurrencyString('1.00', 'JPY')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount has too few digits after the separator to be a thousand amount with an alternative separator', () => {
          expect(() => parseCurrencyString('1,00', 'JPY')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount contains too many digits after the separator to be a thousand amount', () => {
          expect(() => parseCurrencyString('1,0000', 'JPY')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount contains too many digits after the separator to be a thousand amount with an alternative separator', () => {
          expect(() => parseCurrencyString('1.0000', 'JPY')).toThrow(InvalidMonetaryAmountException)
        })
      })

      describe('currencies with an exponent of 2', () => {
        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount contains too few digits after a seperator to be a decimal or thousand amount', () => {
          expect(() => parseCurrencyString('1.0', 'GBP')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount contains too few digits after a seperator to be a decimal or thousand amount with an alternative separator', () => {
          expect(() => parseCurrencyString('1,0', 'GBP')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount contains too many digits after the seperator to be a decimal or thousand amount', () => {
          expect(() => parseCurrencyString('1.0000', 'GBP')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount contains too many digits after the seperator to be a decimal or thousand amount with an alternative separator', () => {
          expect(() => parseCurrencyString('1,0000', 'GBP')).toThrow(InvalidMonetaryAmountException)
        })
      })

      describe('currencies with an exponent of 3', () => {
        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount contains too few digits after a seperator to be a decimal or thousand amount', () => {
          expect(() => parseCurrencyString('1.0', 'BHD')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount contains too few digits after a seperator to be a decimal or thousand amount with an alternative separator', () => {
          expect(() => parseCurrencyString('1,0', 'BHD')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount contains too many digits after the seperator to be a decimal or thousand amount', () => {
          expect(() => parseCurrencyString('1.0000', 'BHD')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when null lowest sub unit and display values when amount contains too many digits after the seperator to be a decimal or thousand amount with an alternative separator', () => {
          expect(() => parseCurrencyString('1,0000', 'BHD')).toThrow(InvalidMonetaryAmountException)
        })
      })

      describe('currencies with an exponent of 4', () => {
        it('throws an InvalidMonetaryAmountException when lowest sub unit and display values when amount contains too few digits after a seperator to be a decimal or thousand amount', () => {
          expect(() => parseCurrencyString('1.0', 'CLF')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when lowest sub unit and display values when amount contains too few digits after a seperator to be a decimal or thousand amount with an alternative separator', () => {
          expect(() => parseCurrencyString('1,0', 'CLF')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when lowest sub unit and display values when amount contains too many digits after the seperator to be a decimal or thousand amount', () => {
          expect(() => parseCurrencyString('1.00000', 'CLF')).toThrow(InvalidMonetaryAmountException)
        })

        it('throws an InvalidMonetaryAmountException when amount contains too many digits after the seperator to be a decimal or thousand amount with an alternative separator', () => {
          expect(() => parseCurrencyString('1,00000', 'CLF')).toThrow(InvalidMonetaryAmountException)
        })
      })
    })
  })
})