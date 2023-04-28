import { createType, Type } from '../runtyped'

/**
 * String type creator.
 * @returns {Type<string>}
 */
export const str: Type<string> = createType(
    'str',
    value => {
        const primitive = value instanceof String ? value.toString() : value
        return typeof primitive === 'string'
    },
    '',
)
