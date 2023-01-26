import { describe, expect, test } from 'vitest'
import { char } from '..'
import { typename } from '../../runtyped'

describe('[char]', () => {

    test('has correct type name', () => {
        expect(typename(char)).toBe('char')
    })

    test('returns the string value it was called with back to the caller', () => {
        expect(char('a')).toBe('a')
        expect(char(String(' '))).toBe(' ')
        expect(char(new String('ρ'))).toEqual(new String('ρ'))
        expect(char('\u0453')).toBe('\u0453')
    })

    test('throws when called with a value that is not a string', () => {
        expect(() => char(0)).toThrow()
        expect(() => char(1)).toThrow()
        expect(() => char(-1)).toThrow()
        expect(() => char('')).toThrow()
        expect(() => char(['1'])).toThrow()
        expect(() => char(true)).toThrow()
        expect(() => char({})).toThrow()
        expect(() => char(null)).toThrow()
        expect(() => char(undefined)).toThrow()
        expect(() => char(() => 1)).toThrow()
    })
})
