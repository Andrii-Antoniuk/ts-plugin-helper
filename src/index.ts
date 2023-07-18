/**
 * Automatically gets the types for member-function or member-property
 *
 * You can pass 3rd argument to the function in order you want to override the return type
 * @see https://docs.mosaic.js.org/develop-an-extension/plugins#member-name
 */
export type GetTypesFromMember<
    Inst,
    PropOrMethod extends keyof Inst,
    R = Inst[PropOrMethod] extends (...args: any[]) => any
        ? ReturnType<Inst[PropOrMethod]>
        : Inst[PropOrMethod],
> = Inst[PropOrMethod] extends (...args: any[]) => any
    ? GetTypesFromMemberF<Inst, PropOrMethod, R>
    : GetTypesFromMemberP<Inst, PropOrMethod, R>;

export type GetTypesFromMemberF<
    Inst,
    M extends keyof Inst,
    R = Inst[M] extends (...args: any[]) => any ? ReturnType<Inst[M]> : never,
> = (
    args: Inst[M] extends (...args: any[]) => any ? Parameters<Inst[M]> : never,
    callback: Inst[M],
    instance: Inst
) => R;

export type GetTypesFromMemberP<
    Inst,
    P extends keyof Inst,
    R = Inst[P],
> = (member: R, instance: Inst) => R;
/**
 * Gets the type for function
 *
 * You can pass 3rd argument to the function in order you want to override the return type
 * @see https://docs.mosaic.js.org/develop-an-extension/plugins#member-name
 */
export type GetTypesFromFunction<
    F extends (...args: any[]) => any,
    C = unknown,
    R = ReturnType<F>,
> = (args: Parameters<F>, callback: F, context: C) => R;
