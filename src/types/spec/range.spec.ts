import { describe, expect, test } from 'vitest'
import { typename } from '../../runtyped'
import { range } from '../range'

describe('[0..1]', () => {
    const UnitInterval = range(0, 1)

    test('has correct type name', () => {
        expect(typename(UnitInterval)).toBe('[0..1]')
    })

    test('returns any number passed as argument that is between 0 and 1', () => {
        expect(UnitInterval(0)).toBe(0)
        expect(UnitInterval(1)).toBe(1)

        Array.from({ length: 100 }, () => Math.random()).forEach(n => {
            expect(UnitInterval(n)).toBe(n)
        })
    })

    test('throws if value passed is not between 0 and 1', () => {
        expect(() => UnitInterval(Number.MIN_SAFE_INTEGER)).toThrow()
        expect(() => UnitInterval(-1)).toThrow()
        expect(() => UnitInterval(0 - Number.EPSILON)).toThrow()
        expect(() => UnitInterval(1 + Number.EPSILON)).toThrow()
        expect(() => UnitInterval(Number.MAX_SAFE_INTEGER)).toThrow()
    })
})