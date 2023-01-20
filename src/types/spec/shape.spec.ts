import { describe, expect, test } from 'vitest'
import { typeOf, shape, str, uint, anyOf, id, opt } from '..'

describe('[*Account]', () => {
    const Account = shape({
        createdAt: uint,
        id: str,
        locale: anyOf(id('en_US'), id('es_MX')),
        user: shape({
            birthday: opt(uint),
            id: str,
            name: str,
            photoUrl: opt(str),
        }),
    })

    test('has correct type name', () => {
        expect(typeOf(Account)).toBe('shape{createdAt:uint,id:str,locale:anyOf<id<en_US>,id<es_MX>>,user:shape{birthday:opt<uint>,id:str,name:str,photoUrl:opt<str>}}')
    })

    test('returns objects that match the specified shape back to the caller', () => {
        const accountShapes = [
            {
                createdAt: Date.now(),
                id: 'account-01',
                locale: 'es_MX',
                photoUrl: 'https://path.to/image.jpg',
                user: {
                    id: 'user-01',
                    name: 'max_tokenz',
                }
            },
            {
                createdAt: Date.now(),
                id: 'account-02',
                locale: 'en_US',
                user: {
                    birthday: Date.now(),
                    id: 'user-02',
                    name: 'glenn_sturg',
                }
            },
            {
                createdAt: Date.now(),
                id: 'account-03',
                locale: 'en_US',
                user: {
                    id: 'user-03',
                    name: 'matteo_87',
                    birthday: Date.now(),
                }
            },
            {
                createdAt: Date.now(),
                id: 'account-04',
                locale: 'en_US',
                user: {
                    birthday: Date.now(),
                    id: 'user-04',
                    name: 'bo_yo_69_waaang',
                    photoUrl: 'photo://url.jpg',
                }
            },
        ]
        accountShapes.forEach(shape => {
            expect(Account(shape)).toMatchObject(shape)
        })
    })

    test('throws if shape not matched', () => {
        const badAccountShapes = [
            {
                // missing non-optional property `createdAt`
                id: 'account-01',
                locale: 'es_MX',
                photoUrl: 'https://path.to/image.jpg',
                user: {
                    id: 'user-01',
                    name: 'max_tokenz',
                }
            },
            {
                createdAt: Date.now(),
                // id property is not a string
                id: 2,
                locale: 'en_US',
                user: {
                    id: 'user-02',
                    name: 'glenn_sturg',
                    birthday: Date.now(),
                }
            },
            {
                createdAt: Date.now(),
                id: 'account-03',
                locale: 'en_US',
                user: {
                    // missing non-optional property `user.id`
                    name: 'matteo_87',
                    birthday: Date.now(),
                }
            },
            {
                createdAt: Date.now(),
                id: 'account-04',
                locale: 'en_US',
                user: {
                    birthday: Date.now(),
                    id: 'user-04',
                    name: 'bo_yo_69_waaang',
                    // optional property `photoUrl` is not a string
                    photoUrl: 48957,
                }
            },
        ]

        badAccountShapes.forEach(shape => {
            expect(() => Account(shape)).toThrow()
        })
    })

})

