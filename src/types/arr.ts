import { createType, Type } from '../runtyped'

export const arr: Type<any[]> = createType(
    `arr`,
    value => Array.isArray(value),
    [],
)
