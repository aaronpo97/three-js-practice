/**
 * A type that represents a positive integer.
 *
 * @example
 *   const foo = <T extends number>(bar: PositiveInteger<T>) => bar;
 *
 *   foo(1); // OK
 *   foo(0); // Error
 *   foo(-1); // Error
 *
 * @template T - The number to check if it's a positive integer.
 * @returns If T is a positive integer, returns T. Otherwise, returns never.
 */
type PositiveInteger<T extends number> = `${T}` extends "0" | `-${any}` | `${any}.${any}`
  ? never
  : T;

export default PositiveInteger;
