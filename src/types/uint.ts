import { extendType, int } from '.'

export const uint = extendType(int, 'uint', value => value >= 0)
