import { describe, expect, test } from 'vitest'
import { id } from '..'
import { typeOf } from '../../runtyped'

describe('[id<true>]', () => {
    const True = id(true)

    test('has correct type name', () => {
        expect(typeOf(True)).toBe('id<true>')
    })
    
    test('only accepts boolean `true` and does no coercions', () => {
        expect(True(true)).toBe(true)
        expect(() => True('true')).toThrow()
        expect(() => True(1)).toThrow()
        expect(() => True({})).toThrow()
        expect(() => True([])).toThrow()
    })
})

describe('[id<false>]', () => {
    const False = id(false)

    test('has correct type name literal', () => {
        expect(typeOf(False)).toBe('id<false>')
    })

    test('only accepts boolean `false` and does no coercions', () => {
        expect(False(false)).toBe(false)
        expect(() => False('false')).toThrow()
        expect(() => False(0)).toThrow()
        expect(() => False('')).toThrow()
        expect(() => False(null)).toThrow()
        expect(() => False(undefined)).toThrow()
    })
})

describe('[id<0>]', () => {
    const Zero = id(0)

    test('has correct type name literal', () => {
        expect(typeOf(Zero)).toBe('id<0>')
    })

    test('only accepts numeric `0` and does no coercions', () => {
        expect(Zero(0)).toEqual(0)
        expect(() => Zero('')).toThrow()
        expect(() => Zero('0')).toThrow()
        expect(() => Zero(false)).toThrow()
        expect(() => Zero(null)).toThrow()
    })
})

describe('[id<1>]', () => {
    const One = id(1)

    test('has correct type name literal', () => {
        expect(typeOf(One)).toBe('id<1>')
    })

    test('only accepts numeric `1` and does no coercions', () => {
        expect(One(1)).toEqual(1)
        expect(() => One(new Number(1))).toThrow()
        expect(() => One('1')).toThrow()
        expect(() => One(true)).toThrow()
        expect(() => One([1])).toThrow()
    })
})

test('[id<object>] accepts object if it references the same copy as the one on the type', () => {
    const array = ['foo']
    // arrays are objects in javascript so we can pass on its reference
    const arrayRef = id(array)
    // `other` is just another pointer to the same copy of the array
    const other = array
    // modifying the shared copy using `array`
    array[1] = 'bar'

    expect(arrayRef(other)).toBe(array)
    expect(() => arrayRef([ ...other ])).toThrow()
})
