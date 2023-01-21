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
    initialize.toString = function Type_toString() {
        return name
    }
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

export type TypedFunctionScope = {
    readonly args: {
        readonly done: boolean
        readonly length: number
        readonly next: unknown
    }
    readonly function: Function
}

export function fn(impl: Function) {
    return (...args: unknown[]) => {
        switchScopes(impl, args)
        const rval = impl()
        if (!scope?.args.done) {
            throw new TypeError(`Too many args passed to ${impl}`)
        }
        return rval
    }
}

let scope: TypedFunctionScope | null = null

const switchScopes = (f: Function, args: unknown[]) => {
    const argsIter = args[Symbol.iterator]()
    scope = Object.freeze({
        args: {
            get done() {
                return !!argsIter.next().done
            },
            get length() {
                return args.length
            },
            get next() {
                const { done, value } = argsIter.next()
                return done ? undefined : value
            },
        },
        function: f,
    })
}

export const a = (type: Type, defval: unknown = undefined) => {
    const argval = scope?.args?.next
    return type(argval !== undefined ? argval : defval)
}

export const A = (...types: (Type[]) | ([Type, unknown][])) => {
    return types.map(type => Array.isArray(type) ? a(...type) : a(type))
}

export function typename(type: Type) {
    return typedefsrev.get(type)
}
