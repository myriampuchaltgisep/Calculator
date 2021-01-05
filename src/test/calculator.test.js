const { calculateResult } = require('../calculator');
const { add, substract, multiply, divide } = require('./fixtures/instructions');
describe('The Calculator returns a valid result after receiving the instructions', () => {
  it('it sums 2 digits when the `add` instruction is given', () => {
    const result = calculateResult(add);
    expect(result).toBe(5);
  });
  it('it substracts from a digit when the `substract` instruction is given', () => {
    const result = calculateResult(substract);
    expect(result).toBe(1);
  });
  it('it multiplies 2 digits when the `multiply` instruction is given', () => {
    const result = calculateResult(multiply);
    expect(result).toBe(6);
  });
  it('it divides 2 digits when the `divide` instruction is given', () => {
    const result = calculateResult(divide);
    expect(result).toBe(3);
  });
});
