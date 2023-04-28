import { createType, Type } from '../runtyped'

/**
 * Numerical type creator.
 * @returns {Type<number>}
 */
export const num: Type<number> = createType(
    'num',
    value => {
        const primitive = (value instanceof Number) ? +value : value
        return Number.isFinite(primitive)
    },
    0,
)
