import { ReactElement } from '@scandipwa/scandipwa/src/type/Common.type';
import { Component, JSXElementConstructor, ReactComponentElement } from 'react';

/**
 * Automatically gets the types for member-function or member-property
 *
 * You can pass 3rd argument to the function in order you want to override the return type
 * @see https://docs.mosaic.js.org/develop-an-extension/plugins#member-name
 *
 * @example
 *
 * const myPluginToMethod: GetTypesFromMember<ClassToWhichYouPlugTo, 'nameOfMethodYouPlugTo',"banana">>
    = (args, callback, instance) => {
        // Do some code
        callback(...args); // No error about callback is not callable!

        return "banana"; // It will accept only banana as return type, since you overrode it
    }

 * @example
    const myPluginToProperty: GetTypesFromMember<ClassToWhichYouPlugTo, 'nameOfPropertyYouPlugTo', {myStuff: number}>
    = (member, instance) => {
        const {someStuff = 42} = member; // You will get a type safety on accessing properties and methods on member

        return {myStuff: someStuff}; //It will accept only your type as return type, since you overrode it
    }
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

export type GetTypesFromMemberP<Inst, P extends keyof Inst, R = Inst[P]> = (
    member: Inst[P],
    instance: Inst
) => R;
/**
 * Gets the type for function
 *
 * You can pass:
 * 2nd argument to the function in order you want to add context of it
 * and
 * 3rd argument to override the return type
 * @example
 * const myPluginToFunc: GetTypesFromMember<typeof functionYouPlugTo,
 *  context = unknown, // if you want to use this keyword.
 * "apple">>
    = (args, callback, instance) => {
        // Do some code
        callback(...args); // No error about callback is not callable!

        return "apple"; // It will accept only apple as return type, since you overrode it
    }

 * @see https://docs.mosaic.js.org/develop-an-extension/plugins#member-name
 */
export type GetTypesFromFunction<
    F extends (...args: any[]) => any,
    C = unknown,
    R = ReturnType<F>,
> = (args: Parameters<F>, callback: F, context: C) => R;

/**
 * Validates if something is Class Component
 */
export type ValidateClassElement<E> = E extends Omit<
ReactComponentElement<JSXElementConstructor<any>>,
'key' | 'type'
>
    ? E
    : never;

/**
 * Validates if something is FC Component
 */
export type ValidateFunctionalElement<E> = E extends (
    props: any
) => ReactElement
    ? E
    : never;

/**
 * Represents any Props
 */
export type Props = Record<PropertyKey, unknown> & { children?: ReactElement };

/**
 * Gets props for any React component
 */
export type GetProps<E extends any> = E extends ValidateClassElement<E>
    ? E['props']
    : E extends ValidateFunctionalElement<E>
        ? Parameters<E>[0]
        : never;

/**
 * Adds state to the class component
 */
export type AddState<
    C extends Component,
    NS extends {},
    S = NS & C['state'],
> = Omit<C, 'setState' | 'state'> & {
    state: S;
    setState: <K extends keyof S>(
        state:
        | ((
            prevState: Readonly<S>,
            props: Readonly<C['props']>
        ) => Pick<S, K> | S | null)
        | (Pick<S, K> | S | null),
        callback?: () => void
    ) => void;
};

/**
 * Adds props to class component
 */
export type AddProps<C extends Component, NP extends {}, P = NP & C['props']> = Omit<C, 'props'> & {
    props: P;
};
