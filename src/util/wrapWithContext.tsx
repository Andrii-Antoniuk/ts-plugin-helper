import {
    Component,
    Consumer,
    createContext,
    FC,
    PropsWithChildren,
    PureComponent,
    ReactNode,
} from 'react';

import { cloneIfValidElement } from './cloneIfValidElement';

/** @namespace tsPluginHelper/Util/WrapWithContext */
export class MyComponent extends PureComponent<{ children: any }> {
    render(): ReactNode {
        const { children } = this.props;

        return children;
    }
}

type TProvider =
    | FC<PropsWithChildren<unknown>>
    | typeof Component<PropsWithChildren<unknown>>;

type TConsumer = Consumer<any>;

/** @namespace tsPluginHelper/Util/WrapWithContext/wrapWithContext */
export const wrapWithContext = (
    component: any,
    Provider: TProvider,
    Consumer: TConsumer,
) => (
    <Provider>
        <Consumer>
            { (contextValue) => cloneIfValidElement(component, {
                newProps: contextValue,
            }) }
        </Consumer>
    </Provider>
);

export const ContextStuff = createContext({ foo: 'moo', bar: 'baz' });

/** @namespace tsPluginHelper/Util/WrapWithContext/MyProvider */
export const MyProvider = ({ children }: PropsWithChildren<{}>) => (
    <ContextStuff.Provider value={ { foo: 'moo', bar: 'baz' } }>
        { children }
    </ContextStuff.Provider>
);
