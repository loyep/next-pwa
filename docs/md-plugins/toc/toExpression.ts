/**
 * Transform a string into an applicable expression.
 *
 * @param value
 * @returns
 */
export const toExpression = (value: string) =>
  new RegExp("^(" + value + ")$", "i");
