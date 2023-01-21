import { createType, Type } from '../runtyped'

export const num: Type<number> = createType('num', (value: any) => {
    const primitive = (value instanceof Number) ? +value : value
    return Number.isFinite(primitive)
})
