import { createType, Type } from '../runtyped'

export const int: Type<number> = createType('int', (value: any) => {
    const primitive = (value instanceof Number) ? +value : value
    return Number.isInteger(primitive)
})
