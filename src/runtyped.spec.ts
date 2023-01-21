import { describe, expect, test } from 'vitest'
import { fn } from './runtyped'
import { arrOf, opt, str, uint } from './types'

describe('typed function ctor `fn` with "per-argument" typed arg injection', () => {

    test('forwards args and returns function call when passed values match the described type', () => {
        const fnUint = fn((n = uint()) => n)
        expect(fnUint(0)).toBe(0)
        const fnOptStr = fn((s = opt(str)()) => s)
        expect(fnOptStr()).toBeUndefined()
        expect(fnOptStr('')).toBe('')
        const fnDefStr = fn((s = str('hello')) => s)
        expect(fnDefStr()).toBe('hello')
        expect(fnDefStr('hi')).toBe('hi')
        const fnUintOptStr = fn((n = uint(), s = opt(str)()) => s ? [n, s] : n)
        expect(fnUintOptStr(5)).toBe(5)
        expect(fnUintOptStr(Number.MAX_SAFE_INTEGER, 's')).toEqual([
            Number.MAX_SAFE_INTEGER,
            's',
        ])
    })

    test('throws and does not call function when passed values do not match the described type', () => {
        const fnUint = fn((n = uint()) => n)
        expect(() => fnUint()).toThrow()
        expect(() => fnUint(-1)).toThrow()
        const concat = fn((parts = arrOf(str)() as string[]) => parts.join(''))
        expect(() => concat()).toThrow()
        expect(() => concat([1, 's'])).toThrow()
    })

    test('throws if not all arguments are injected', () => {
        const fnUint = fn((n = uint()) => n)
        expect(() => fnUint(0, 1)).toThrow()
        const concat = fn((parts = arrOf(str)() as string[]) => parts.join(''))
        expect(() => concat(['s', 't'], ['r'])).toThrow()
    })
})

// describe('typed function ctor `fn` with "bulk" typed arg injection', () => {

//     test('forwards args and returns function call when passed values match the described type', () => {
//         const fnUint = fn(([n] = A(uint)) => n)
//         expect(fnUint(0)).toBe(0)
//         const fnOptStr = fn(([s] = A(opt(str))) => s)
//         expect(fnOptStr()).toBeUndefined()
//         expect(fnOptStr('')).toBe('')
//         const fnUintOptStr = fn(([n, s] = A(uint, opt(str))) => s ? [n, s] : n)
//         expect(fnUintOptStr(5)).toBe(5)
//         expect(fnUintOptStr(Number.MAX_SAFE_INTEGER, 's')).toEqual([
//             Number.MAX_SAFE_INTEGER,
//             's',
//         ])
//     })

//     test('throws and does not call function when passed values do not match the described type', () => {
//         const fnUint = fn(([n] = A(uint)) => n)
//         expect(() => fnUint()).toThrow()
//         expect(() => fnUint(-1)).toThrow()
//         const concat = fn((parts = A(arrOf(str)) as string[]) => parts.join(''))
//         expect(() => concat()).toThrow()
//         expect(() => concat([1, 's'])).toThrow()
//     })
// })
