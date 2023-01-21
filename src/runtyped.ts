/**
 * A function used to assert that a given value is of some specific
 * type. A type is defined as a simple boolean classifier that can
 * be accessed via the `assert` property on the function. 
 */
export type Type<T = any> = {
    /**
     * Assert given `value` is of certain type.
     * The assertion is done using a simple boolean classifier to
     * classify `value`. When classified as `true`, a `value` is said
     * to be of or belong to that specific type.
     */
    (value?: unknown | undefined): T
    assert: TypeAssertion,
}

/**
 * Defines a type as a boolean classifier.
 */
export type TypeAssertion<V = unknown> = (value: V) => boolean

export type TypedFunctionScope = {
    readonly args: {
        readonly done: boolean
        readonly length: number
        readonly next: unknown
    }
    readonly function: Function
}

const typedefs = new Map<string, Type>()

const typedefsrev = new Map<Type, string>()

let scope: TypedFunctionScope | null = null

/**
 * Define a new type.
 * 
 * @param name type name
 * @param assert
 * a function to assert if a given value belongs to the type
 * @returns the newly created `Type`
 */
export function createType<T = any>(name: string, assert: TypeAssertion): Type<T> {
    if (typedefs.has(name)) {
        return typedefs.get(name) as Type
    }
    function assignOrInject(value?: unknown | undefined) {
        // Consume next argument if in typed function scope
        const argval = scope?.args.next ?? undefined
        return assertOrThrow(
            name,
            assert,
            argval !== undefined ? argval : value,
        ) as T
    }
    assignOrInject.assert = assert
    assignOrInject.toString = function Type_toString() {
        return name
    }
    typedefs.set(name, assignOrInject)
    typedefsrev.set(assignOrInject, name)
    return assignOrInject
}

/**
 * Extend an existing type.
 *
 * @param base the type to extend
 * @param name the extended type name
 * @param assert 
 * a function to assert if a given value belongs to the type
 * @returns the extended type
 */
export function extendType<T, U extends T = T>(
    base: Type<T>,
    name: string,
    assert: TypeAssertion<T>,
): Type<U> {
    const assertAll = (...assertions: TypeAssertion[]): TypeAssertion => (
        (value: unknown) => assertions.every(assert => assert(value))
    )
    return createType(name, assertAll(base.assert, assert as TypeAssertion))
}

/**
 * @summary #### Define a function with runtime assertable argument types.
 * 
 * 
 * When using `fn`, arguments can be type-asserted simply by assigning
 * the result of calling a `Type` as their default value.
 * @example
 * ```
 * // A function that returns the maximum between 2 numbers
 * const max = fn((a = num(), b = num()) => a > b ? a : b)
 * ```
 * A function is only called if the values passed at runtime assert
 * their assigned argument `Type`, otherwise an error is thrown.
 * @example
 * ```
 * // An event handler that expects certain properties to exist on the
 * // passed event object
 * const MouseEvent = shape({
 *   clientX: uint,
 *   clientY: uint,
 * })
 * const handleClick = fn((e = MouseEvent()) => {
 *   // Handle event
 * })
 * ```
 * To actually assign a default value to some argument, pass it as an
 * argument to `Type`.
 * @example
 * ```
 * // A function that reads the value of any of the red ('r'),
 * // green ('g') and blue ('b') components of a pixel, defaulting to
 * // red if component not specified by third argument
 * const readRGBComponent = fn((
 *   x = uint(),
 *   y = uint(),
 *   c = anyOf('r', 'g', 'b')('r'),
 * ) => //...
 * ```
 * @description
 * This all works by wrapping the actual function implementation inside
 * another *proxy* function that sets up a new *function scope* upon
 * each call and use it to expose the values that were received as
 * calling arguments to the whole library (including custom types
 * created with `createType` and `extendType` post hoc). When a
 * function scope exists, `Type` calls will use it to iterate once over
 * those values (each `Type` call will consume the next value in the
 * iteration until no more values are left) and assert them instead of
 * whatever they are passed as an argument. This is how, when the
 * wrapped function is finally **called with no arguments**, those
 * `Type` calls manage to *inject* all corresponding values to the
 * argument variables, once they are evaluated under the function scope.
 * 
 * @param wrapped
 * A function implementation that can have type-assertable arguments.
 * @returns value obtained by calling the function argument
 */
export function fn(wrapped: Function) {
    return (...args: unknown[]) => {
        switchScopes(wrapped, args)
        const rval = wrapped()
        if (!scope?.args.done) {
            throw new TypeError(`Too many args passed to ${wrapped}`)
        }
        scope = null
        return rval
    }
}

/**
 * #### Get the standard given name of a `Type`.
 * @param type The `Type` to name.
 * @returns The name given to this `type`
 */
export function typename(type: Type) {
    return typedefsrev.get(type)
}

function assertOrThrow(
    name: string,
    assert: TypeAssertion,
    value: unknown,
    errorMsg = `Cannot initialize type [${name}] with: ${value}.`,
) {
    if (!assert(value)) {
        throw new TypeError(errorMsg)
    }
    return value
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
