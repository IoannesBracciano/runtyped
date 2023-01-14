import { createType, Type, typeOf } from '.'

export const anyOf = (...types: Type[]) => createType(
    `anyOf<${types.map(typeOf).join(',')}>`, 
    value => types.some(({ assert }) => assert(value)),
)
