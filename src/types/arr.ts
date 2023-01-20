import { createType } from '../runtyped'

export const arr = createType(`arr`, value => Array.isArray(value))
