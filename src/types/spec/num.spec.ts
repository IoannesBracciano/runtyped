import { describe, expect, test } from 'vitest'
import { num } from '..'
import { typeOf } from '../../runtyped'

describe('[num]', () => {

    test('has correct type name', () => {
        expect(typeOf(num)).toBe('num')
    })

    test('returns the numeric value it was called with back to the caller', () => {
        const numbers = Array.from({ length: 100 }, () => (
            (Math.random() * Number.MAX_SAFE_INTEGER) * (
                Math.random() < 0.5 ? -1 : 1
            )
        ))

        numbers.forEach(value => {
            expect(num(value)).toBe(value)
        })
    })

    test('throws when called with a value that is not a number', () => {
        expect(() => num('')).toThrow()
        expect(() => num('0')).toThrow()
        expect(() => num(['1'])).toThrow()
        expect(() => num(true)).toThrow()
        expect(() => num({})).toThrow()
        expect(() => num(null)).toThrow()
        expect(() => num(undefined)).toThrow()
        expect(() => num(() => 1)).toThrow()
    })
})
