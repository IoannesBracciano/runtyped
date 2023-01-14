import { createType } from '.'

export const int = createType('int', (value: any) => {
    const primitive = (value instanceof Number) ? +value : value
    return Number.isInteger(primitive)
})
