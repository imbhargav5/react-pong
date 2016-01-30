/**
 * Random Number between 2 numbers
 */
export function randomNumBetween(min, max) {
  return Math.random() * (max - min + 1) + min;
};