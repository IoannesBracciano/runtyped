import { describe, expect, test } from 'vitest'
import { int } from '..'
import { typename } from '../../runtyped'

describe('[int]', () => {

    test('has correct type name', () => {
        expect(typename(int)).toBe('int')
    })

    test('returns the integer value it was called with back to the caller', () => {
        const integers = Array.from({ length: 100 }, () => (
            Math.round(Math.random() * Number.MAX_SAFE_INTEGER) * (
                Math.random() < 0.5 ? -1 : 1
            )
        ))

        integers.forEach(value => {
            expect(int(value)).toBe(value)
        })

        expect(int(new Number(Number.MIN_SAFE_INTEGER))).toEqual(new Number(Number.MIN_SAFE_INTEGER))
    })

    test('throws when called with a value that is not an integer', () => {
        const decimals = Array.from({ length: 100 }, () => (
            Math.random() < 0.5 ? Math.random() * -1 : Math.random()
        ))

        decimals.forEach(value => {
            expect(() => int(value)).toThrow()
        })

        expect(() => int(new Number(.5))).toThrow()
        expect(() => int('')).toThrow()
        expect(() => int('0')).toThrow()
        expect(() => int(['1'])).toThrow()
        expect(() => int(true)).toThrow()
        expect(() => int({})).toThrow()
        expect(() => int(null)).toThrow()
        expect(() => int(undefined)).toThrow()
        expect(() => int(() => 1)).toThrow()
    })
})

