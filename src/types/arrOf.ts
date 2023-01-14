import { createType, Type, typeOf } from '.'

export const arrOf = (type: Type) => createType(`arrOf<${typeOf(type)}>`, value => (
    Array.isArray(value) && value.every(type.assert)
))
