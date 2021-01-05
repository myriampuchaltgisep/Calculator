const { calculateResult } = require('../calculator');
describe('The Calculator returns a valid result after receiving the instructions', () => {
  it('it sums 2 digits when the `add` instruction is given', () => {
    const add = [
      { operation: 'add', value: 2 },
      { operation: 'apply', value: 3 },
    ];
    const result = calculateResult(add);
    expect(result).toBe(5);
  });
});
