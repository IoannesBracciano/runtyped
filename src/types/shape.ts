import { createType, Type, typename } from '../runtyped'

/**
 * Type creator for an object matching a specific shape.
 * @param def Object specifying the shape to match.
 * @returns {Type}
 */
export const shape = (def: Record<PropertyKey, Type>) => createType(
    `shape{${Object.entries(def).map(([key, type]) => `${key}:${typename(type)}`)}}`,
    value => !!value
        && typeof value === 'object'
        && Object.entries(def).every(([key, type]) => (
            type.assert((value as any)[key]))
        ),
    Object.fromEntries(
        Object.entries(def).map(([key, type]) => [key, type.defval]),
    ),
)
