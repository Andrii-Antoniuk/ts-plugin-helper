/* eslint-disable @scandipwa/scandipwa-guidelines/use-namespace */
/* eslint-disable @scandipwa/scandipwa-guidelines/export-level-one */

import { DEFAULT_MAX_TRY_COUNT, DEFAULT_TRY_INTERVAL_MS } from './config';

interface Options<
    T extends ((...args: any) => any) | ((...args: any) => Promise<any>),
> {
    /**
     * A condition fn that needs to be met to consider callback as completed
     */
    condition?: (result: ReturnType<T>) => boolean;
    maxTryCount?: number;
    tryIntervalMS?: number;
}

function returnTrue() {
    return true;
}

/**
 * Helper function that awaits for callback result to be successful
 * @returns your value or false if it failed
 * Warning: If you value is intended to be false, it could lead to false-positive
 *
 * @example
 * async function example() {
    const email = await waitForCallback(
        // callback that needs to be awaited
        () => getStore().getState().MyAccountReducer?.customer?.email,
        {
            maxTryCount: 10,
            tryIntervalMS: 5000
        },
        );
    }
 */
export const waitForCallback = async <
    T extends ((...args: any) => any) | ((...args: any) => Promise<any>),
>(
    /**
     * Callback function that needs to be awaited
     */
    callback: T,
    {
        condition = returnTrue,
        maxTryCount = DEFAULT_MAX_TRY_COUNT,
        tryIntervalMS = DEFAULT_TRY_INTERVAL_MS,
    }: Options<T> = {},
    n = 0,
): Promise<Awaited<ReturnType<T>> | false> => {
    if (n === maxTryCount) {
        return false;
    }

    const val = await callback();

    if (val && condition(val)) {
        return val;
    }

    await new Promise((res) => setTimeout(res, tryIntervalMS));

    return waitForCallback(
        callback,
        { condition, maxTryCount, tryIntervalMS },
        n + 1,
    );
};

async function example() {
    const myF = () => new Promise<string>((res) => setTimeout(() => res('abc'), 1000));

    const email = await waitForCallback(
        // callback that needs to be awaited
        myF,
        {
            maxTryCount: 10,
            tryIntervalMS: 5000,
        },
    );
}
