import { createType } from '../runtyped'

export const str = createType('str', value => {
    const primitive = value instanceof String ? value.toString() : value
    return typeof primitive === 'string'
})
