/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */
import {
    Component,
    Consumer,
    createContext,
    FC,
    PropsWithChildren,
    PureComponent,
    ReactElement,
} from 'react';
import ReactDOM from 'react-dom';

import { cloneIfValidElement } from './cloneIfValidElement';

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
export const MyProvider = ({ children }: PropsWithChildren<unknown>) => (
    <ContextStuff.Provider value={ { foo: 'moo', bar: 'baz' } }>
        { children }
    </ContextStuff.Provider>
);

const MyFComponent = (props: any) => {
    console.log(props);

    return <div>Hello</div>;
};

class MyComponent extends PureComponent {
    render(): ReactElement {
        console.log(this.props);

        return <div>Class component</div>;
    }
}

const ResultC = wrapWithContext(
    <MyComponent />,
    MyProvider,
    ContextStuff.Consumer,
);
const ResultF = wrapWithContext(
    <MyFComponent />,
    MyProvider,
    ContextStuff.Consumer,
);

const Results = () => (
    <>
        { ResultC }
        { ResultF }
    </>
);

ReactDOM.render(<Results />, document.body);
