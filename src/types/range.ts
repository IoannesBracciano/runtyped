import { extendType, Type } from '../runtyped'
import { num } from './num'

/**
 * Discreet numerical range type creator.
 * @param {number} start Inclusive range start.
 * @param {number} end Inclusive range end.
 * @returns {Type<number>}
 */
export const range: (start: number, end: number) => Type<number> = (
    start,
    end,
) => extendType(
    num,
    `[${start}..${end}]`,
    value => value >= start && value <= end,
)
