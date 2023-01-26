import { extendType, Type } from '../runtyped'
import { str } from './str'

export const char: Type<string> = extendType(
    str,
    'char',
    value => value.length === 1,
)
