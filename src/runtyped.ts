export type Type = {
    <T>(...args: any[]): T
    assert: (...args: any[]) => boolean,
}

export type TypeAssertion = (value: any) => boolean

export type TypedFunctionScope = {
    readonly args: {
        readonly done: boolean
        readonly length: number
        readonly next: unknown
    }
    readonly function: Function
}

export type TypeHint = 'default' | 'number' | 'string'

const typedefs = new Map<string, Type>()

const typedefsrev = new Map<Type, string>()

let scope: TypedFunctionScope | null = null

export function createType(name: string, assert: TypeAssertion) {
    if (typedefs.has(name)) {
        return typedefs.get(name) as Type
    }
    function assignOrInject(value?: any | undefined) {
        // Consume next argument if in typed function scope
        const argval = scope?.args.next ?? undefined
        return assertOrThrow(name, assert, argval !== undefined ? argval : value)
    }
    assignOrInject.assert = assert
    assignOrInject.toString = function Type_toString() {
        return name
    }
    typedefs.set(name, assignOrInject)
    typedefsrev.set(assignOrInject, name)
    return assignOrInject
}

export function extendType(base: Type, name: string, assert: TypeAssertion) {
    const assertAll = (...assertions: TypeAssertion[]): TypeAssertion => (
        (value: unknown) => assertions.every(assert => assert(value))
    )
    return createType(name, assertAll(base.assert, assert))
}

export function fn(impl: Function) {
    return (...args: unknown[]) => {
        switchScopes(impl, args)
        const rval = impl()
        if (!scope?.args.done) {
            throw new TypeError(`Too many args passed to ${impl}`)
        }
        scope = null
        return rval
    }
}

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

export function typename(type: Type) {
    return typedefsrev.get(type)
}

function assertOrThrow(
    name: string,
    assert: TypeAssertion,
    value: any,
    errorMsg = `Cannot initialize type [${name}] with: ${value}.`,
) {
    if (!assert(value)) {
        throw new TypeError(errorMsg)
    }
    return value
}
