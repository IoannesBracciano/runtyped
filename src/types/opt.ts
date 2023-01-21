import { createType, Type, typename } from '../runtyped'

export const opt = <T>(type: Type<T>) => createType<T | undefined>(
    `opt<${typename(type)}>`,
    value => type.assert(value) || value === undefined,
)
