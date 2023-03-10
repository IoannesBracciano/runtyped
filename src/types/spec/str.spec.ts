import { describe, expect, test } from 'vitest'
import { str } from '..'
import { typename } from '../../runtyped'

describe('[str]', () => {

    test('has correct type name', () => {
        expect(typename(str)).toBe('str')
    })

    test('returns the string value it was called with back to the caller', () => {
        expect(str('')).toBe('')
        expect(str(String(''))).toBe('')
        expect(str(new String('instance'))).toEqual(new String('instance'))
        expect(str('string')).toBe('string')
    })

    test('throws when called with a value that is not a string', () => {
        expect(() => str(0)).toThrow()
        expect(() => str(1)).toThrow()
        expect(() => str(-1)).toThrow()
        expect(() => str(['1'])).toThrow()
        expect(() => str(true)).toThrow()
        expect(() => str({})).toThrow()
        expect(() => str(null)).toThrow()
        expect(() => str(undefined)).toThrow()
        expect(() => str(() => 1)).toThrow()
    })
})
