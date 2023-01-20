import { createType } from '../runtyped'

export const id = <T>(value: T) => createType(`id<${value}>`, (v: any) => v === value)
