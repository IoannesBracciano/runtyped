import { createType, Type } from '../runtyped'

export const num: Type<number> = createType(
    'num',
    value => {
        const primitive = (value instanceof Number) ? +value : value
        return Number.isFinite(primitive)
    },
    0,
)
