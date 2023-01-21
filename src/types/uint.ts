import { int } from './int'
import { extendType, Type } from '../runtyped'

export const uint: Type<number> = extendType(int, 'uint', value => value >= 0)
