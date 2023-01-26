import { describe, expect, test } from 'vitest'
import { extendType, typename } from '../../runtyped'
import { f, int, num } from '..'

describe('[f<num>]', () => {
    // Number() === 0
    const NumberDefaultCtor = f(num)

    test('has correct type name', () => {
        expect(typename(NumberDefaultCtor)).toBe('f<num>')
    })

    test('returns passed function reference if it matches the signature', () => {
        expect(NumberDefaultCtor(Number)).toBe(Number)
        expect(NumberDefaultCtor(Math.random)).toBe(Math.random)
    })

    test('throws if passed function does not matche the signature', () => {
        expect(() => NumberDefaultCtor(Array)).toThrow()
        expect(() => NumberDefaultCtor(Boolean)).toThrow()
        expect(() => NumberDefaultCtor(Object)).toThrow()
        expect(() => NumberDefaultCtor(String)).toThrow()
        expect(() => NumberDefaultCtor(() => '0')).toThrow()
        expect(() => NumberDefaultCtor('0')).toThrow()
        expect(() => NumberDefaultCtor(() => undefined)).toThrow()
        expect(() => NumberDefaultCtor(undefined)).toThrow()
        expect(() => NumberDefaultCtor(() => NaN)).toThrow()
        expect(() => NumberDefaultCtor(NaN)).toThrow()
        expect(() => NumberDefaultCtor(() => null)).toThrow()
        expect(() => NumberDefaultCtor(null)).toThrow()
    })
})

describe('[f<fr,int>]', () => {
    const fr = extendType(num, 'fr', () => true, 1/2)
    const RoundFn = f(fr, int)

    test('has correct type name', () => {
        expect(typename(RoundFn)).toBe('f<fr,int>')
    })
    
    test('returns function reference if passed function accepts one `fr` arg and returns a `int`', () => {
        expect(RoundFn(Math.ceil)).toBe(Math.ceil)
        expect(RoundFn(Math.ceil)(1/2)).toBe(1)
        expect(RoundFn(Math.floor)).toBe(Math.floor)
        expect(RoundFn(Math.floor)(1/2)).toBe(0)
        expect(RoundFn(Math.round)).toBe(Math.round)
        expect(RoundFn(Math.round)(1/2)).toBe(1)
    })

    test('throws', () => {
        expect(() => RoundFn(Array)).toThrow()
        expect(() => RoundFn(Array())).toThrow()
        expect(() => RoundFn(Boolean)).toThrow()
        expect(() => RoundFn(Boolean())).toThrow()
        expect(() => RoundFn(Number)).toThrow()
        expect(() => RoundFn(Number())).toThrow()
        expect(() => RoundFn(Object)).toThrow()
        expect(() => RoundFn(Object())).toThrow()
        expect(() => RoundFn(String)).toThrow()
        expect(() => RoundFn(String())).toThrow()
        expect(() => RoundFn(Math.sqrt)).toThrow()
        expect(() => RoundFn(Math.pow)).toThrow()
        expect(() => RoundFn(Number.prototype.toFixed.bind(1))).toThrow()
    })
})