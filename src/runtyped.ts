import { Type } from './types'

export type TypedFunctionScope = {
    readonly args: {
        readonly length: number
        readonly next: unknown
    }
    readonly function: Function
}

export function fn(impl: Function) {
    return (...args: unknown[]) => {
        switchScopes(impl, args)
        return impl()
    }
}

let scope: TypedFunctionScope | null = null

const switchScopes = (f: Function, args: unknown[]) => {
    const argsIter = args[Symbol.iterator]()
    scope = Object.freeze({
        args: {
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
