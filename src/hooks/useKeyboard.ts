import { useEffect } from 'react';

/**
 * Custom hook for handling a single key press
 * @param key The key to listen for
 * @param callback Function to execute when the key is pressed
 */
export function useKey(key: string, callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      if (pressedKey === key.toLowerCase()) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
}

/**
 * Custom hook for handling multiple key presses
 * @param keyMap Object mapping keys to callback functions
 */
export function useKeys(keyMap: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const pressedKey = e.key.toLowerCase();

      Object.entries(keyMap).forEach(([key, callback]) => {
        if (pressedKey === key.toLowerCase()) {
          callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyMap]);
}