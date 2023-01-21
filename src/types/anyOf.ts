import { createType, Type, typename } from '../runtyped'
import { id } from './id'

export const anyOf = <T extends readonly any[]>(...types: T) => {
    const tnormalized = types.map(type => (
        typeof type !== 'function' || !typename(type)
            ? id(type)
            : type
    ))
    return createType<T[number] extends Type<infer S> ? S : T[number]>(
        `anyOf<${tnormalized.map(typename).join(',')}>`, 
        value => tnormalized.some(({ assert }) => assert(value)),
    )
}
