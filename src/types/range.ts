import { extendType, Type } from '../runtyped'
import { num } from './num'

export const range: (start: number, end: number) => Type<number> = (
    start,
    end,
) => extendType(
    num,
    `[${start}..${end}]`,
    value => value >= start && value <= end,
)
