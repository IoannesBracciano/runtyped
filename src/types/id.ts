import { createType } from '../runtyped'

export const id = <T>(value: T) => createType<T>(`id<${value}>`, v => v === value, value)
