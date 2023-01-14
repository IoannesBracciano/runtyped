import { describe, expect, test } from 'vitest'
import { typeOf, uint } from '..'

describe('[uint]', () => {

    test('has correct type name', () => {
        expect(typeOf(uint)).toBe('uint')
    })

    test('accepts any positive integer value, including `0`', () => {
        expect(uint(0)).toBe(0)

        const positiveIntegers = Array.from({ length: 100 }, () => (
            Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
        ))

        positiveIntegers.forEach(value => {
            expect(uint(value)).toBe(value)
        })
    })

    test('throws if passed value is not a positive integer or `0`', () => {
        const negativeIntegers = Array.from({ length: 100 }, () => (
            -1 * (Math.round(Math.random() * (Number.MAX_SAFE_INTEGER - 2)) + 1)
        ))

        negativeIntegers.forEach(value => {
            expect(() => uint(value)).toThrow()
        })

        const decimals = Array.from({ length: 100 }, () => (
            Math.random() < 0.5 ? Math.random() * -1 : Math.random()
        ))

        decimals.forEach(value => {
            expect(() => uint(value)).toThrow()
        })

        expect(() => uint('')).toThrow()
        expect(() => uint('0')).toThrow()
        expect(() => uint(['1'])).toThrow()
        expect(() => uint(true)).toThrow()
        expect(() => uint({})).toThrow()
        expect(() => uint(null)).toThrow()
        expect(() => uint(undefined)).toThrow()
        expect(() => uint(() => 1)).toThrow()
    })
})

