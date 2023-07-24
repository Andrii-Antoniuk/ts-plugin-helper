# TS-PLUGIN-HELPER

ts-plugin-helper contains few generic types that can help you with [ScandiPWA](https://scandipwa.com/) plugins (extension) creation.

Repo: https://github.com/Andrii-Antoniuk/ts-plugin-helper


Package: https://www.npmjs.com/package/ts-plugin-helper

## How to use
### Installation

Firstly, install the ts-plugin-helper for your extension.

-   With npm

```bash
npm i ts-plugin-helper
```

-   With yarn

```bash
yarn add ts-plugin-helper
```

### Possible properties

- Class properties
```typescript
// The code below will automatically infer is it member-function (method on class) or member-property
type GetTypesFromMember<
    ClassToWhichYouPlugTo,
    'nameOfMethodOrPropertyYouPlugTo',
    // You can pass new return type if your extension requires that.
    // Note, that new return type won't be inferred automatically for other plugins
    // It is return type of your **plugin** function
    newReturnType = ReturnType<typeof ClassToWhichYouPlugTo["nameOfMethodOrPropertyYouPlugTo"]>>
```

In case you want to be more precise, you can use:

```typescript
type GetTypesFromMemberF // for member-function
type GetTypesFromMemberP // for member-property
```

- Function plugins
```typescript
// The code below will type safe your plugin function
type GetTypesFromFunction<
    typeof functionYouPlugTo,
    ContextOfFunction = unknown,
    // You can pass new return type if your extension requires that.
    // Note, that new return type won't be inferred automatically for other plugins
    // It is return type of your **plugin** function
    newReturnType = ReturnType<typeof functionYouPlugTo>
>
```

## Example usage:

```typescript

import CompareIconComponent from '@scandipwa/scandipwa/src/component/CompareIcon';
import { GetTypesFromMember } from 'ts-plugin-helper';

/** @namespace DisableCompare/Plugin/RemoveIcons/renderNoIcon */
const renderNoIcon: GetTypesFromMember<CompareIconComponent, 'render'> = (
    args // automatically inferred as [],
    callback // automatically inferred as callback function,
    _instance // has all of the property as instance class,
) => {
    callback(...args);

    return null;
};

```

## How extensions work

[Mosaic docs](https://docs.mosaic.js.org/)

[ScandiPWA docs](https://docs.create-scandipwa-app.com/extensions/application-plugins)