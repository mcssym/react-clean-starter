import { useCallback, useState } from 'react';

type ToggleHandler = (value: boolean) => void;
// Hook
// Parameter is the boolean, with default "false" value
export const useToggle = (initialState = false): [boolean, ToggleHandler] => {
    // Initialize the state
    const [state, setState] = useState(initialState);

    // Define and memorize toggler function in case we pass down the component,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback(() => { setState(state => !state); }, []);

    return [state, toggle]
}
