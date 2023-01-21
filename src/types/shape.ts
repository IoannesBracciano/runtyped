import { createType, Type, typename } from '../runtyped'

export const shape = (def: Record<PropertyKey, Type>) => createType(
    `shape{${Object.entries(def).map(([key, type]) => `${key}:${typename(type)}`)}}`,
    value => !!(
        value
        && typeof value === 'object'
        && Object.entries(def).every(([key, type]) => type.assert((value as any)[key]))
    ),
)
