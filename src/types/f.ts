import { createType, Type, typename } from '../runtyped'

export const f: (...ts: Type[]) => Type<(...args: any[]) => any> = (...ts) => {
    const rvaltype = ts.pop()

    return createType(
        `f<${ts.concat(rvaltype || []).map(typename).join(',')}>`,
        value => typeof value === 'function'
            && !!rvaltype?.assert(value(...ts.map(t => t.defval))),
        () => rvaltype?.defval,
    )
}
