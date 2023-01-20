import { int } from './int'
import { extendType } from '../runtyped'

export const uint = extendType(int, 'uint', value => value >= 0)
