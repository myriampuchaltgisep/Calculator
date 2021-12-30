const { createReadStream } = require('fs');
const { createInterface } = require('readline');
const operations = require('./helpers/mathOperations');
const calculator = async () => {
  await readInstructions()
    .then((instructions) => {
      return calculateResult(instructions);
    })
    .catch((err) => {
      console.log(err);
    });
};
const readInstructions = async () => {
  let instructions = [];
  const readStream = createReadStream('instructions.txt');
  const readInterface = createInterface({
    input: readStream,
  });

  readStream.on('error', (error) => {
    throw new Error(error);
  });

  for await (const line of readInterface) {
    console.log(line);
    const spaceIndex = line.indexOf(' ');
    const operation = String(line.substring(0, spaceIndex));
    const value = Number(line.substring(spaceIndex + 1));
    instructions.push({ operation, value });
  }

  return instructions;
};
const calculateResult = (instructions) => {
  const { value: initialValue } = instructions.pop();

  const finalResult = instructions.reduce((result, instruction) => {
    const mathOperation = operations.get(instruction.operation);
    if (typeof mathOperation === 'function') {
      return mathOperation(result, instruction.value);
    }
    throw new Error('The text file isn`t valid for reading');
  }, initialValue);

  console.log(finalResult);
  return finalResult;
};

module.exports = { calculator, calculateResult, readInstructions };
