import { describe, expect, test } from 'vitest'
import { typename } from '../../runtyped'
import { strf } from '../strf'

describe('[strf</^(\d\.?\d*)|(\d?\.\d+)$/>', () => {
    const NumDigit = strf(/^((\d\.?\d*)|(\d?\.\d+))$/)

    test('has correct type name', () => {
        expect(typename(NumDigit)).toBe('strf</^((\\d\\.?\\d*)|(\\d?\\.\\d+))$/>')
    })

    test('returns the string passed as argument back to the caller if it matches the pattern', () => {
        expect(NumDigit('0')).toBe('0')
        expect(NumDigit(String('1.'))).toBe('1.')
        expect(NumDigit(new String('0.5'))).toEqual(new String('0.5'))
        expect(NumDigit('.5')).toBe('.5')
    })

    test('throws when called with a malformatted string', () => {
        expect(() => NumDigit('0..')).toThrow()
        expect(() => NumDigit('..5')).toThrow()
        expect(() => NumDigit('.')).toThrow()
        expect(() => NumDigit('..')).toThrow()
        expect(() => NumDigit('0.5.')).toThrow()
        expect(() => NumDigit('1.5.7')).toThrow()
        expect(() => NumDigit('.5.')).toThrow()
        expect(() => NumDigit('0,7')).toThrow()
    })

    test('throws when called with any value that is not of type `strf</^(\d\.?\d*)|(\d?\.\d+)$/>`', () => {
        expect(() => NumDigit(0)).toThrow()
        expect(() => NumDigit(1)).toThrow()
        expect(() => NumDigit(-1)).toThrow()
        expect(() => NumDigit('')).toThrow()
        expect(() => NumDigit(['1'])).toThrow()
        expect(() => NumDigit(true)).toThrow()
        expect(() => NumDigit({})).toThrow()
        expect(() => NumDigit(null)).toThrow()
        expect(() => NumDigit(undefined)).toThrow()
        expect(() => NumDigit(() => 1)).toThrow()
    })
})
