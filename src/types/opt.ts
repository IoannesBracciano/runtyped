import { createType, Type, typeOf } from '../runtyped'

export const opt = (type: Type) => createType(
    `opt<${typeOf(type)}>`,
    value => type.assert(value) || value === undefined,
)
