import { extendType, Type } from '../runtyped'
import { str } from './str'

/**
 * Formatted string type creator.
 * @param pattern The string's format.
 * @returns {Type<String>}
 */
export const strf: (pattern: string | RegExp) => Type<string> = pattern => extendType(
    str,
    `strf<${pattern}>`,
    value =>  RegExp(pattern).test(value),
)
