import { int } from './int'
import { extendType, Type } from '../runtyped'

/**
 * Unsigned integer type creator.
 * @returns {Type<number>}
 */
export const uint: Type<number> = extendType(int, 'uint', value => value >= 0)
