import { createType } from '../runtyped'

export const num = createType('num', (value: any) => {
    const primitive = (value instanceof Number) ? +value : value
    return Number.isFinite(primitive)
})
