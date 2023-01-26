import { describe, expect, test } from 'vitest'
import { arrOf, uint } from '..'
import { typename } from '../../runtyped'

describe('[arrOf<uint>]', () => {
    const uintArr = arrOf(uint)

    test('has correct type name', () => {
        expect(typename(uintArr)).toBe('arrOf<uint>')
    })

    test('has default value an empty array', () => {
        expect(uintArr.defval).toEqual([])
    })

    test('returns the array passed as argument back to the caller, if it only contains `uint` elements', () => {
        const uints = [0, 1, Number.MAX_SAFE_INTEGER]
        const oneElem = [0]
        const empty: number[] = []

        expect(uintArr(uints)).toBe(uints)
        expect(uintArr(oneElem)).toBe(oneElem)
        expect(uintArr(empty)).toBe(empty)
    })

    test('throws when called with a value that is not an array of `uint` elements only', () => {
        const ints = [Number.MIN_SAFE_INTEGER, 0, 1, Number.MAX_SAFE_INTEGER]
        const negativeValues = [Number.MIN_VALUE, 0]
        const decimalValues = [0, 1/2, 5]
        const stringValues = ['0', '100']
        const booleanValues = [false, true]
        const mixedValues = ['0', false, 5, 7, undefined, 9845839/3, null, {}, 2]

        expect(() => uintArr(ints)).toThrow()
        expect(() => uintArr(negativeValues)).toThrow()
        expect(() => uintArr(decimalValues)).toThrow()
        expect(() => uintArr(stringValues)).toThrow()
        expect(() => uintArr(booleanValues)).toThrow()
        expect(() => uintArr(mixedValues)).toThrow()
        expect(() => uintArr('0')).toThrow()
        expect(() => uintArr([[]])).toThrow()
        expect(() => uintArr(true)).toThrow()
        expect(() => uintArr({})).toThrow()
        expect(() => uintArr({ length: 5 })).toThrow()
        expect(() => uintArr(null)).toThrow()
        expect(() => uintArr(undefined)).toThrow()
        expect(() => uintArr(() => 1)).toThrow()
    })
})

describe('[arrOf<arrOf<uint>>]', () => {
    const uintArrArr = arrOf(arrOf(uint))

    test('has correct type name', () => {
        expect(typename(uintArrArr)).toBe('arrOf<arrOf<uint>>')
    })

    test('has default value an empty array', () => {
        expect(uintArrArr.defval).toEqual([])
    })

    test('returns the array passed as argument back to the caller, if its elements are `uint` arrays', () => {
        const uints = [[0], [1], [Number.MAX_SAFE_INTEGER]]
        const uintsVaryingLength = [[0], [1, Number.MAX_SAFE_INTEGER], []]
        const oneElem = [[0]]
        const empty: number[][] = []
        const emptyInner: number[][] = [[]]

        expect(uintArrArr(uints)).toBe(uints)
        expect(uintArrArr(uintsVaryingLength)).toBe(uintsVaryingLength)
        expect(uintArrArr(oneElem)).toBe(oneElem)
        expect(uintArrArr(empty)).toBe(empty)
        expect(uintArrArr(emptyInner)).toBe(emptyInner)
    })

    test('throws when called with a value that is not an array of `uint` elements only', () => {
        const intArrays = [[Number.MIN_SAFE_INTEGER, 0], [1, Number.MAX_SAFE_INTEGER]]
        const ints = [Number.MIN_SAFE_INTEGER, 0, 1, Number.MAX_SAFE_INTEGER]
        const negativeValues = [[Number.MIN_VALUE, 0], [0], [-1, 1]]
        const decimalValues = [[0], [1/2, 5]]
        const stringValues = [['0'], ['100']]
        const booleanValues = [[false, true]]
        const mixedValues = [['0', false], [5, 7], [undefined, 9845839/3, null], [{}, 2]]

        expect(() => uintArrArr(intArrays)).toThrow()
        expect(() => uintArrArr(ints)).toThrow()
        expect(() => uintArrArr(negativeValues)).toThrow()
        expect(() => uintArrArr(decimalValues)).toThrow()
        expect(() => uintArrArr(stringValues)).toThrow()
        expect(() => uintArrArr(booleanValues)).toThrow()
        expect(() => uintArrArr(mixedValues)).toThrow()
        expect(() => uintArrArr('0')).toThrow()
        expect(() => uintArrArr(true)).toThrow()
        expect(() => uintArrArr({})).toThrow()
        expect(() => uintArrArr({ length: 5 })).toThrow()
        expect(() => uintArrArr(null)).toThrow()
        expect(() => uintArrArr(undefined)).toThrow()
        expect(() => uintArrArr(() => 1)).toThrow()
    })
})
