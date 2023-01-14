import { createType } from '.'

export const str = createType('str', value => typeof value === 'string')
