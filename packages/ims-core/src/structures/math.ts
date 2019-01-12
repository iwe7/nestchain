export abstract class MathFactory {
  bits: MathBitsFactory;

  abstract euclideanAlgorithm(originalA: number, originalB: number): number;
  abstract euclideanAlgorithmIterative(
    originalA: number,
    originalB: number,
  ): number;
  abstract factorial(num: number): number;
  abstract factorialRecursive(num: number): number;
  abstract fastPowering(base: number, power: number): number;
  abstract fibonacci(n: number): number[];
  abstract fibonacciNth(n: number): number;
  abstract fibonacciClosedForm(position: number): number;

  abstract dft(
    inputAmplitudes: ComplexNumber[],
    zeroThreshold: number,
  ): ComplexNumber[];
  abstract fastFourierTransform(
    inputData: ComplexNumber[],
    inverse: boolean,
  ): ComplexNumber[];
  abstract inverseDiscreteFourierTransform(
    frequencies: ComplexNumber[],
    zeroThreshold: number,
  ): number[];

  abstract integerPartition(num: number): number;
  abstract isPowerOfTwo(num: number): boolean;
  abstract isPowerOfTwoBitwise(num: number): boolean;
  abstract leastCommonMultiple(a: number, b: number): number;
  abstract liuHui(splitCount: number): number;
  abstract pascalTriangle(lineNumber: number): number[];
  abstract pascalTriangleRecursive(lineNumber: number): number[];

  abstract trialDivision(num: number): boolean;
  abstract degreeToRadian(degree: number): number;
  abstract radianToDegree(radian: number): number;
  abstract sieveOfEratosthenes(maxNumber: number): number[];
}

export abstract class MathBitsFactory {
  abstract bitLength(num: number): number;
  abstract bitsDiff(a: number, b: number): number;
  abstract clearBit(num: number, bitPosition: number): number;
  abstract countSetBits(originalNumber: number): number;
  abstract divideByTwo(num: number): number;
  abstract getBit(num: number, bitPosition: number): number;
  abstract isEven(num: number): boolean;
  abstract isPositive(num: number): boolean;
  abstract isPowerOfTwo(num: number): boolean;
  abstract multiply(a: number, b: number): number;
  abstract multiplyByTwo(num: number): number;
  abstract multiplyUnsigned(a: number, b: number): number;
  abstract setBitmultiplyByTwo(num: number, bitPosition: number): number;
  abstract switchSign(num: number): number;
  abstract updateBit(
    num: number,
    bitPosition: number,
    bitValue: number,
  ): number;
}

export abstract class ComplexNumber {
  abstract add(addend: ComplexNumber | number): ComplexNumber;
  abstract subtract(subtrahend: ComplexNumber | number): ComplexNumber;
  abstract multiply(subtrahend: ComplexNumber | number): ComplexNumber;
  abstract divide(subtrahend: ComplexNumber | number): ComplexNumber;
  abstract conjugate(subtrahend: ComplexNumber | number): ComplexNumber;
  abstract getRadius(): number;
  abstract getPhase(inRadians: boolean): number;
  abstract getPolarForm(inRadians: boolean): { radius: number; phase: number };
  abstract toComplexNumber(num: ComplexNumber | number): ComplexNumber;
}
