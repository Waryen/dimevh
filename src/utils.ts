import React, { useEffect, useRef } from 'react';

/**
 *
 * Get only valid elements from React children
 * @param children A collection of React children
 * @returns A filtered collection of valid React elements
 */
export const getValidChildren = (children: React.ReactNode) => {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  );
};

/**
 *
 * Track a value to get his previous reference after each re-render
 * @param value The value to track between each re-render
 * @returns The previous value
 */
export const usePrevious = <T>(value: T) => {
  const valueRef = useRef<T>();

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef.current;
};
