import { extendType, Type } from '../runtyped'
import { str } from './str'

export const strf: (pattern: string | RegExp) => Type<string> = pattern => extendType(
    str,
    `strf<${pattern}>`,
    value =>  RegExp(pattern).test(value),
)
