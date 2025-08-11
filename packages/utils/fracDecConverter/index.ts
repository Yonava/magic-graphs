/**
 * will come in handy for markov chains!
 */

export const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

export const isNullOrUnd = (input: any) =>
  input === null || input === undefined;

export const isFraction = (input: string) => {
  const fraction = input.trim().split('/').filter(Boolean);
  if (fraction.length !== 2) return false;
  const [numerator, denominator] = fraction.map(Number);
  if (isNullOrUnd(numerator) || isNullOrUnd(denominator)) return false;
  return true;
};

export const decimalToFraction = (decimalInput: number) => {
  const decimal = Math.round(decimalInput * 1e10) / 1e10;
  const len = decimal.toString().length - 2;
  let denominator = 10 ** len;
  let numerator = decimal * denominator;
  const divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;
  if (denominator === 1) return numerator.toString();
  return `${numerator}/${denominator}`;
};

/**
 * @param fractionInput  a string representing a fraction
 * @returns the decimal representation of the fraction or undefined if the input is not a fraction
 */
export const fractionToDecimal = (fractionInput: string) => {
  if (!isFraction(fractionInput)) return;
  const fraction = fractionInput.split('/');
  const [numerator, denominator] = fraction.map(Number);
  return numerator / denominator;
};
