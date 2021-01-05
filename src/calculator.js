const operations = require('./helpers/mathOperations');
const calculateResult = (instructions) => {
  const { value: initialValue } = instructions.pop();

  const finalResult = instructions.reduce((result, instruction) => {
    const mathOperation = operations.get(instruction.operation);
    return mathOperation(result, instruction.value);
  }, initialValue);

  console.log(finalResult);
  return finalResult;
};

module.exports = { calculateResult };
