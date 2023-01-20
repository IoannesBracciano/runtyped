import { createType, Type, typename } from '../runtyped'

export const opt = (type: Type) => createType(
    `opt<${typename(type)}>`,
    value => type.assert(value) || value === undefined,
)
