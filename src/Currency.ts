import InvalidMonetaryAmountException from './exception/InvalidMonetaryAmountException'

// See https://www.iso.org/iso-4217-currency-codes.html
// Currencies with an exponent of 0 - 0 decimal digits
const exponentZeroCurrencyCodes = [
  'BIF',
  'CLP',
  'DJF',
  'GNF',
  'ISK',
  'JPY',
  'KMF',
  'KRW',
  'PYG',
  'RWF',
  'UGX',
  'UYI',
  'VND',
  'VUV',
  'XAF',
  'XOF',
  'XPF',
]

// currencies with an exponent of 3 - 3 decimal digits
const exponentThreeCurrencyCodes = ['BHD', 'IQD', 'JOD', 'KWD', 'LYD', 'OMR', 'TND']

//currencies with an expont of 4 - 4 decimal digits
const exponentFourCurrencyCodes = ['CLF', 'UYW']

/**
 * The currencies exponent, for example JPY the units are already the common amount so therefore 0, GBP = 2 for pence
 * @param currencyCode
 */
export const getExponent = (currencyCode: string) => {
  if (exponentZeroCurrencyCodes.includes(currencyCode)) return 0
  if (exponentThreeCurrencyCodes.includes(currencyCode)) return 3
  if (exponentFourCurrencyCodes.includes(currencyCode)) return 4
  return 2
}

/**
 * Remove all characters that are not digits, . or , (£1,000.00 GBP > 1,000.00)
 * Remove all but the last . or , (1,000.00 > 1000.00)
 * @param amount
 */
const sanitise = (amount: string): string => {
  return amount
    .toString()
    .replace(/[^\d.,]/g, '')
    .replace(/[.,](?=.*[.,])/g, '')
}

/**
 * Returns the normalised lowest sub unit amount and the display ammount e.g. 1050 & £10.50
 * @param amount
 * @param currency
 */
export const parseCurrencyString = (amount: string, currency: string): number => {
  const sanitisedAmount = sanitise(amount)
  const currencyExponent = getExponent(currency)

  const { main, fractional } = getAmountUnitsFromCurrencyString(sanitisedAmount, currency)

  const sanitisedMainUnits = main.replace(/\D/g, '')

  return parseInt(sanitisedMainUnits) * Math.pow(10, currencyExponent) + Number(fractional)
}

/**
 * Get's the main and sub units of a given amount
 * Split on . or , (should always result in only 1 or 2 parts)
 * If only 1 part after split, and part is not an empty string, then it is a whole value (e.g. 100 > ['100'])
 * If 2 parts but the 1st is an empty string then replace with 0 (e.g. .50 > 0.50)
 *
 * @param amount
 * @param currencyExponent
 * @throws InvalidMonetaryAmountException
 */
export const getAmountUnitsFromCurrencyString = (
  amount: string,
  currency: string
): { main: string; fractional: string } => {
  const currencyExponent = getExponent(currency)
  let amountParts = amount.toString().split(/\.|\,/)

  if (amountParts.length === 1) {
    // Handle empty string
    if (amountParts[0].length > 0) return { main: amount, fractional: '0' }
  }

  if (!amountParts[0]) {
    amountParts[0] = '0'
  }

  const secondaryAmountLength = amountParts[1] ? amountParts[1].toString().length : ''

  switch (currencyExponent) {
    // If 2 parts then the 2nd part has to be 3 digits (e.g. 1,000 > ['1', '000'])
    case 0:
      if (secondaryAmountLength === 3) return { main: amount, fractional: '0' }
      break
    // If 2 parts and the 2nd part has 2 digits then it is a decimal value (e.g. 1.00 > ['1', '00'])
    // If 2 parts and the 3rd part has 3 digits then it is a whole value (e.g. 1,000 > ['1', '000'])
    case 2:
      if (secondaryAmountLength === 2) return { main: amountParts[0], fractional: amountParts[1] }
      if (secondaryAmountLength === 3) return { main: amount, fractional: '0' }
      break
    // Get the separator, all currencies with an exponent of 3 uses . as the decimal separator, and is the only way to tell a decimal value from a whole thousand value
    // If 2 parts and the 2nd part has 3 digits and the separator is a . then it is a decimal value (e.g. 1.000 > ['1', '000])
    // If 2 parts and the 2nd part has 3 digits and the separator is a , then is is a whole value (e.g. 1,000 > ['1', '000])
    case 3:
      const decimalSeparator = amount.toString().charAt(amount.toString().length - (currencyExponent + 1))
      if (secondaryAmountLength === 3 && decimalSeparator == '.') return { main: amountParts[0], fractional: amountParts[1] }
      if (secondaryAmountLength === 3 && decimalSeparator == ',') return { main: amount, fractional: '0' }
      break
    // If 2 parts and the 2nd part has 4 digits then it is a decimal value (e.g. 1.0000 > ['1', '0000'])
    // If 2 parts and the 2nd part has 3 digits then it is a whole value (e.g. 1,000 > ['1', '000'])
    case 4:
      if (secondaryAmountLength === 4) return { main: amountParts[0], fractional: amountParts[1] }
      if (secondaryAmountLength === 3) return { main: amount, fractional: '0' }
      break
  }

  throw new InvalidMonetaryAmountException(amount, currency)
}
