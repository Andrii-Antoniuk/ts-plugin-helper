/* eslint-disable @scandipwa/scandipwa-guidelines/use-namespace */

import { ReactElement } from '@scandipwa/scandipwa/src/type/Common.type';
import { cloneElement, isValidElement } from 'react';

type Props = Record<PropertyKey, unknown> & {children?: ReactElement};

interface Options<T> {
    newProps?: Props & T;
    mergeProps?: boolean;
    newChildren?: ReactElement;
    mergeChildren?: boolean;
}

export function cloneIfValidElement<T extends Props>(
    element: ReactElement,
    {
        mergeChildren = true,
        newChildren,
        newProps,
    }: Options<T> = {},
) {
    if (!isValidElement<T>(element)) {
        return element;
    }

    const {props: {children: prevChildren}} = element;

    const children = getChildren(newChildren, prevChildren, mergeChildren);

    return cloneElement(
        element,
        newProps,
        children,
    );
}

export function getChildren(
    newChildren: ReactElement,
    prevChildren: ReactElement,
    mergeChildren: boolean,
): ReactElement{
    if (!newChildren){
        return prevChildren;
    }

    if (!mergeChildren){
        return newChildren;
    }

    return [prevChildren, newChildren];
}
