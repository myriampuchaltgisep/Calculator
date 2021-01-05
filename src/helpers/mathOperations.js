const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const mathOperations = new Map([
  ['add', add],
  ['substract', substract],
  ['multiply', multiply],
  ['divide', divide],
]);

module.exports = mathOperations;
