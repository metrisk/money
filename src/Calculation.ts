const isHalf = (value: number) => Math.abs(value) % 1 === 0.5
const isEven = (value: number) => value % 2 === 0

export const round = (value: number, mode: ROUNDING_MODES = ROUNDING_MODES.ROUND_HALF_EVEN): number => {
  return ROUNDING_METHODS[mode](value)
}

export enum ROUNDING_MODES {
  ROUND_HALF_ODD = 'HALF_ODD',
  ROUND_HALF_EVEN = 'HALF_EVEN',
  ROUND_HALF_UP = 'HALF_UP',
  ROUND_HALF_DOWN = 'HALF_DOWN',
  ROUND_TOWARDS_ZERO = 'TOWARDS_ZERO',
  ROUND_AWAY_FROM_ZERO = 'AWAY_FROM_ZERO',
}

const ROUNDING_METHODS = {
  HALF_UP(value: number): number {
    return Math.round(value)
  },
  HALF_DOWN(value: number): number {
    return isHalf(value) ? Math.floor(value) : Math.round(value)
  },
  HALF_ODD(value: number): number {
    if (!isHalf(value)) return Math.round(value)

    return !isEven(Math.floor(value)) ? Math.floor(value) : Math.round(value)
  },
  HALF_EVEN(value: number): number {
    if (!isHalf(value)) return Math.round(value)

    return isEven(Math.floor(value)) ? Math.floor(value) : Math.round(value)
  },
  TOWARDS_ZERO(value: number) {
    return Math.sign(value) * Math.floor(Math.abs(value))
  },
  AWAY_FROM_ZERO(value: number) {
    return Math.sign(value) * Math.ceil(Math.abs(value))
  },
}
