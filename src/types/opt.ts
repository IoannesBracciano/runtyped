import { createType, Type, typename } from '../runtyped'

/**
 * Make `type` optional.
 * @param {Type<T>} type
 * @returns {Type<T | undefined>}
 */
export const opt = <T>(type: Type<T>) => createType<T | undefined>(
    `opt<${typename(type)}>`,
    value => type.assert(value) || value === undefined,
    undefined,
)
