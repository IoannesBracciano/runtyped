import { createType, Type, typename } from '../runtyped'

export const arrOf = <T>(type: Type<T>) => createType<T[]>(`arrOf<${typename(type)}>`, value => (
    Array.isArray(value) && value.every(type.assert)
))
