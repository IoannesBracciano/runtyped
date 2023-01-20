import { createType, Type, typename } from '../runtyped'

export const arrOf = (type: Type) => createType(`arrOf<${typename(type)}>`, value => (
    Array.isArray(value) && value.every(type.assert)
))
