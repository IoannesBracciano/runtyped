import { describe, expect, test } from 'vitest'
import { typeOf, shape, str, uint, arrOf, anyOf, id, opt } from '..'

describe('[Account->shape{...}]', () => {
    const Account = shape({
        createdAt: uint,
        id: str,
        locale: anyOf(id('en_US'), id('es_MX')),
        photoUrl: opt(str),
        username: str,
    })

    test('has correct type name', () => {
        expect(typeOf(Account)).toBe('shape{createdAt:uint,id:str,locale:anyOf<id<en_US>,id<es_MX>>,photoUrl:opt<str>,username:str}')
    })

    test('returns objects that match the specified shape back to the caller', () => {
        const accountShapes = [
            {
                createdAt: Date.now(),
                id: 'account-01',
                locale: 'es_MX',
                photoUrl: 'https://path.to/image.jpg',
                username: 'max_tokenz',
            },
            {
                createdAt: Date.now(),
                id: 'account-02',
                locale: 'en_US',
                username: 'glenn_sturg',
            },
        ]
        accountShapes.forEach(shape => {
            expect(Account(shape)).toMatchObject(shape)
        })
    })

})

