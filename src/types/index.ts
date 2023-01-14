export type Type = {
    <T>(...args: any[]): T
    assert: (...args: any[]) => boolean,
}

export type TypeAssertion = (value: any) => boolean

export type TypeHint = 'default' | 'number' | 'string'

const typedefs = new Map<string, Type>()
const typedefsrev = new Map<Type, string>()

export function createType(name: string, assert: TypeAssertion) {
    if (typedefs.has(name)) {
        return typedefs.get(name) as Type
    }
    function initialize(value: any) {
        if (!assert(value)) {
            throw new TypeError(`Cannot initialize type [${name}] with: ${value}.`)
        }
        return value
    }
    initialize.assert = assert
    typedefs.set(name, initialize)
    typedefsrev.set(initialize, name)
    return initialize
}

export function extendType(base: Type, name: string, assert: TypeAssertion) {
    const assertAll = (...assertions: TypeAssertion[]): TypeAssertion => (
        (value: unknown) => assertions.every(assert => assert(value))
    )
    return createType(name, assertAll(base.assert, assert))
}

export function typeOf(type: Type) {
    return typedefsrev.get(type)
}

export { anyOf } from './anyOf'
export { arr } from './arr'
export { arrOf } from './arrOf'
export { id } from './id'
export { int } from './int'
export { num } from './num'
export { opt } from './opt'
export { shape } from './shape'
export { str } from './str'
export { uint } from './uint'
