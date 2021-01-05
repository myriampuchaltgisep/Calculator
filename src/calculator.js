const calculateResult = (instructions) => {
  const { value: initialValue } = instructions.pop();

  const finalResult = instructions.reduce((result, instruction) => {
    return result + instruction.value;
  }, initialValue);

  console.log(finalResult);
  return finalResult;
};

module.exports = { calculateResult };
