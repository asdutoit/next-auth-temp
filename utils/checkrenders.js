// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useRef } from 'react';

function print(value) {
    if (typeof value === 'object') {
        return JSON.stringify(value);
    } else {
        return value.toString();
    }
}
function useLogIfChanged(name, value) {
    const previous = useRef(value);
    if (!Object.is(previous.current, value)) {
        console.log(
            `${name} changed. Old: ${print(previous.current)}, New: ${print(
                value
            )} `
        );
        previous.current = value;
    }
}

export { useLogIfChanged };
