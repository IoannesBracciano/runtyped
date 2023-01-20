import { describe, expect, test } from 'vitest'
import { opt, str } from '..'
import { typename } from '../../runtyped'

describe('[opt<str>]', () => {

    const optStr = opt(str)

    test('has correct type name', () => {
        expect(typename(optStr)).toBe('opt<str>')
    })

    test('returns the string value it was called with back to the caller', () => {
        expect(optStr('')).toBe('')
        expect(optStr(String(''))).toBe('')
        expect(optStr('string')).toBe('string')
    })

    test('returns `undefined` back to the caller', () => {
        expect(optStr(undefined)).toBe(undefined)
    })

    test('throws when called with a value that is not a string, `undefined`', () => {
        expect(() => optStr(0)).toThrow()
        expect(() => optStr(1)).toThrow()
        expect(() => optStr(-1)).toThrow()
        expect(() => optStr(['1'])).toThrow()
        expect(() => optStr(true)).toThrow()
        expect(() => optStr({})).toThrow()
        expect(() => optStr(null)).toThrow()
        expect(() => optStr(() => 1)).toThrow()
    })
})
