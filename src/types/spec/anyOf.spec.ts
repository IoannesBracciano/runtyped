import { expect, test } from 'vitest'
import { anyOf, arrOf, uint } from '..'

test('[anyOf] returns value if it is of any of the types specified', () => {
    const union = anyOf(uint, arrOf(uint))
    expect(union(1)).toEqual(1)
    expect(union([0,1])).toEqual([0,1])
})

test('[anyOf] type throws if value type is none of the types specified', () => {
    const union = anyOf(uint, arrOf(uint))
    expect(() => union(-1)).toThrow()
    expect(() => union('any')).toThrow()
    expect(() => union([1, 2, 'a'])).toThrow()
    expect(() => union(['1'])).toThrow()
})
