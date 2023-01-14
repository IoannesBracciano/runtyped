import { createType } from '.'

export const arr = createType(`arr`, value => Array.isArray(value))
