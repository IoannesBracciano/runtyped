import { createType, Type, typename } from '../runtyped'

export const anyOf = <T extends readonly Type[]>(...types: T) =>
    createType<T[number] extends Type<infer S> ? S : never>(
        `anyOf<${types.map(typename).join(',')}>`, 
        value => types.some(({ assert }) => assert(value)),
    )
