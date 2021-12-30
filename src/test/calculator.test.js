const { calculateResult, readInstructions } = require('../calculator');
const {
  add,
  substract,
  multiply,
  divide,
  invalid
} = require('./fixtures/instructions.js');

const fs = require('fs');
const readline = require('readline');
const { PassThrough } = require('stream');
jest.mock('fs'); // this auto mocks all methods on fs - so we can treat fs.createReadStream like we would jest.fn()
jest.mock('readline');
jest.useFakeTimers();

// const textInstructions = require('./fixtures/instructions.txt');

// jest.mock("fs", () => {
//     return {
//       createReadStream: jest.fn().mockReturnThis(),
//     };
//   });
describe.skip('The Calculator returns the result after receiving the instructions', () => {
  it('should sum 2 digits when the `add` instruction is given', () => {
    const result = calculateResult(add);
    expect(result).toBe(5);
  });
  it('should substract from a digit when the `substract` instruction is given', () => {
    const result = calculateResult(substract);
    expect(result).toBe(1);
  });
  it('should multiply 2 digits when the `multiply` instruction is given', () => {
    const result = calculateResult(multiply);
    expect(result).toBe(6);
  });
  it('should divide 2 digits when the `divide` instruction is given', () => {
    const result = calculateResult(divide);
    expect(result).toBe(3);
  });
  it('should fail if the instructions aren`t valid', () => {
    try {
        calculateResult(invalid);
    } catch (e) {
        expect(e.message).toBe("The text file isn`t valid for reading");
    }
  });
});

describe('The Calculator reads the instructions from a text file', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should create the read stream', () => {
    const mockReadable = new PassThrough();
    fs.createReadStream.mockReturnValueOnce(mockReadable);
    readInstructions();
    expect(fs.createReadStream).toHaveBeenCalled();
  });

  it('should create the readline interface', () => {
    readline.createInterface.mockReturnValueOnce({});
    readInstructions();
    expect(readline.createInterface).toHaveBeenCalled();
  });

  it('should return array of instructions if the file could be read', async () => {
    const mockReadable = new PassThrough();
    fs.createReadStream.mockReturnValueOnce(mockReadable);

    readline.createInterface.mockReturnValueOnce({
      line: jest.fn().mockImplementationOnce((line, cb) => {cb('')})
    });

    await readInstructions();    // resolve all promises
    jest.runAllTimers();

    // Not sur what to return here
    // Do I have to return the actions of the interface I'm using? (line, close, error?)

    await expect(readInstructions()).resolves.toEqual('heya!');
  });
});

it.skip('should return the list of instructions in an array if successful', async () => {
  const instructions = readInstructions();
  expect(instructions).toEqual([
    { operation: 'add', value: 2 },
    { operation: 'apply', value: 3 },
  ]);
});

//   expect(fs.createReadStream).toBeCalled();
// expect(stream.on).toBeCalledWith("error", eventHandlerMap["finish"]);
