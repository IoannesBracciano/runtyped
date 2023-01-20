import { createType, Type, typename } from '../runtyped'

export const anyOf = (...types: Type[]) => createType(
    `anyOf<${types.map(typename).join(',')}>`, 
    value => types.some(({ assert }) => assert(value)),
)
