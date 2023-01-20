import { describe, expect, test } from 'vitest'
import { arr } from '..'
import { typename } from '../../runtyped'

describe('[arr]', () => {

    test('has correct type name', () => {
        expect(typename(arr)).toBe('arr')
    })

    test('returns any array value it was called with back to the caller', () => {
        const intArr = [Number.MIN_VALUE, -1, 0, 1, Number.MAX_SAFE_INTEGER]
        const strArr = ['', 'string']
        const emptyArr: never[] = []
        const randArray = ['', Number.MIN_SAFE_INTEGER, null, undefined, Number.MAX_SAFE_INTEGER]
        const arr2D = [[1, 2], ['', 'str'], [undefined], null]

        expect(arr(intArr)).toBe(intArr)
        expect(arr(strArr)).toBe(strArr)
        expect(arr(emptyArr)).toBe(emptyArr)
        expect(arr(randArray)).toBe(randArray)
        expect(arr(arr2D)).toBe(arr2D)
    })

    test('throws when called with a value that is not an array', () => {
        expect(() => arr('')).toThrow()
        expect(() => arr('0')).toThrow()
        expect(() => arr(true)).toThrow()
        expect(() => arr({})).toThrow()
        expect(() => arr(null)).toThrow()
        expect(() => arr(undefined)).toThrow()
        expect(() => arr(() => 1)).toThrow()
    })
})
