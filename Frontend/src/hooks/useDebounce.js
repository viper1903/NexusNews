import { useState, useEffect } from 'react';

// This custom hook takes a value and a delay time
function useDebounce(value, delay) {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer that will update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // This is the cleanup function.
    // It will run every time the `value` changes (i.e., on every keystroke).
    // It cancels the previous timer, so the API call is only made after the user stops typing.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;