import { useCallback, useState } from 'react';

/**
 * Type representing a toggle handler function.
 * @param {boolean} value - The new boolean value.
 */
type ToggleHandler = (value: boolean) => void;

/**
 * Custom hook for managing a boolean state with a toggle function.
 * @param {boolean} [initialState=false] - The initial state of the boolean.
 * @returns {[boolean, ToggleHandler]} An array containing the current state and the toggle handler function.
 */
export const useToggle = (initialState = false): [boolean, ToggleHandler] => {
    // Initialize the state
    const [state, setState] = useState(initialState);

    // Define and memorize toggler function in case we pass down the component,
    // This function changes the boolean value to its opposite value
    const toggle = useCallback(() => {
        setState(state => !state);
    }, []);

    return [state, toggle];
};