import { createType, Type, typeOf } from '../runtyped'

export const shape = (def: Record<PropertyKey, Type>) => createType(
    `shape{${Object.entries(def).map(([key, type]) => `${key}:${typeOf(type)}`)}}`,
    value => Object.entries(def).every(([key, type]) => type.assert(value[key])),
)
