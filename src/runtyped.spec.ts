import { describe, expect, test } from 'vitest'
import { extendType, fn } from './runtyped'
import { anyOf, arrOf, opt, str, uint } from './types'

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
        const concat = fn((parts = arrOf(str)()) => parts.join(''))
        expect(() => concat()).toThrow()
        expect(() => concat([1, 's'])).toThrow()
    })

    test('throws if not all arguments are injected', () => {
        const fnUint = fn((n = uint()) => n)
        expect(() => fnUint(0, 1)).toThrow()
        const concat = fn((parts = arrOf(str)()) => parts.join(''))
        expect(() => concat(['s', 't'], ['r'])).toThrow()
    })
})

describe('nested function argument assertion', () => {
    const hexDigits = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f'
    ] as const
    const HexDigit = anyOf(...hexDigits)
    const HexStr = extendType(str, 'hexstr', value => value.split('').every(HexDigit))
    const hexToDec = fn((hex = HexStr()) => parseInt(hex, 16))
    const Color = fn((value = HexStr()) => (
        [[0, 2], [2, 4], [4, 6]]
            .map(range => value.slice(...range))
            .map(v => hexToDec(v)))
    )

    test('asserts arguments of outer and inner function definitions correctly', () => {
        expect(hexToDec('ff')).toBe(255)
        expect(hexToDec('10')).toBe(16)
        expect(hexToDec('0a')).toBe(10)
        expect(Color('ff100a')).toEqual([255, 16, 10])
    })
})
