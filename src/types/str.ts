import { createType } from '../runtyped'

export const str = createType('str', value => typeof value === 'string')
