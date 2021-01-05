import { round, ROUNDING_MODES } from "../../Calculation"

describe('Calculation', () => {
  describe('round', () => {
    it('should round number half up', () => {
      expect(round(1.2, ROUNDING_MODES.ROUND_HALF_UP)).toStrictEqual(1)
      expect(round(1.5, ROUNDING_MODES.ROUND_HALF_UP)).toStrictEqual(2)
    })

    it('should round number half down', () => {
      expect(round(1.2, ROUNDING_MODES.ROUND_HALF_DOWN)).toStrictEqual(1)
      expect(round(1.5, ROUNDING_MODES.ROUND_HALF_DOWN)).toStrictEqual(1)
      expect(round(1.6, ROUNDING_MODES.ROUND_HALF_DOWN)).toStrictEqual(2)
    })

    it('should round number half odd', () => {
      expect(round(3.5, ROUNDING_MODES.ROUND_HALF_ODD)).toStrictEqual(3)
      expect(round(4.5, ROUNDING_MODES.ROUND_HALF_ODD)).toStrictEqual(5)
    })

    it('should round number half even', () => {
      expect(round(3.5, ROUNDING_MODES.ROUND_HALF_EVEN)).toStrictEqual(4)
      expect(round(4.5, ROUNDING_MODES.ROUND_HALF_EVEN)).toStrictEqual(4)
    })

    it('should round number towards zero', () => {
      expect(round(3.5, ROUNDING_MODES.ROUND_TOWARDS_ZERO)).toStrictEqual(3)
      expect(round(-4.5, ROUNDING_MODES.ROUND_TOWARDS_ZERO)).toStrictEqual(-4)
    })

    it('should round number away from zero', () => {
      expect(round(3.5, ROUNDING_MODES.ROUND_AWAY_FROM_ZERO)).toStrictEqual(4)
      expect(round(-4.5, ROUNDING_MODES.ROUND_AWAY_FROM_ZERO)).toStrictEqual(-5)
    })
  })
})