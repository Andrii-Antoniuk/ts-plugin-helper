/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
/* eslint-disable @scandipwa/scandipwa-guidelines/use-namespace */

import { ReactElement } from '@scandipwa/scandipwa/src/type/Common.type';
import { cloneElement, isValidElement } from 'react';

type Props = Record<PropertyKey, unknown> & {children?: ReactElement};

interface Options<T> {
    /**
     * newProps will be shallowly merged with old props
     * @see https://react.dev/reference/react/cloneElement
     */
    newProps?: T;
    /**
     * Any valid ReactNode
     * @see https://react.dev/reference/react/isValidElement#react-elements-vs-react-nodes
     */
    newChildren?: ReactElement;
    mergeChildren?: boolean;
}
/**
 * Clones the element if it's valid
 * @returns Cloned element with parameters you passed or initial element
 *
 * @example
 *  const defaultComponent = callback(...args);

    const modifiedElement1 = cloneIfValidElement(defaultComponent, {
        newProps: {
            myNewKey: "I'm a new prop for that element, cool!"
            existedKey: "I'll replace the original prop of that component"
        }
    });

    const modifiedElement2 = cloneIfValidElement(defaultComponent, {
        mergeChildren: false,
        newChildren: "I'll replace original children of component"
    });

    const modifiedElement3 = cloneIfValidElement(defaultComponent, {
        mergeChildren: true,
        newChildren: () => <div>Now I live here too</div>
    });

 */
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

function getChildren(
    newChildren: ReactElement,
    prevChildren: ReactElement,
    mergeChildren: boolean,
): ReactElement {
    const isValidNode = isReactNode(newChildren);

    if (!newChildren || !isValidNode){
        return prevChildren;
    }

    if (!mergeChildren){
        return newChildren;
    }

    return [prevChildren, newChildren];
}

/**
 * Checks for whether something is a valid ReactNode
 *
 * ReactNodes vs ReactElements:
 * @see https://react.dev/reference/react/isValidElement#react-elements-vs-react-nodes
 * Stolen from prop-types with removal of Symbol support:
 * @see https://github.com/facebook/prop-types/blob/main/factoryWithTypeCheckers.js#L474
 */
export function isReactNode(element: unknown): boolean{
    switch (typeof element) {
    case 'number':
    case 'string':
    case 'undefined':
        return true;
    case 'boolean':
        return !element;
    case 'object':
        if (Array.isArray(element)) {
            return element.every(isReactNode);
        }

        if (element === null || isValidElement(element)) {
            return true;
        }

        return false;
    default:
        return false;
    }
}
