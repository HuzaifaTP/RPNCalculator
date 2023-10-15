
function compute(expression) {
    var stack = []
    const tokens = expression.split(' ');
    if (tokens.length === 2 && tokens[1] === 'sqrt') {
        return Math.sqrt(parseFloat(tokens[0]));
    }

    const [operand1, operand2, operator] = expression.split(' ');

    switch (operator) {
        case '+':
            return parseFloat(operand1) + parseFloat(operand2);
        case '-':
            return parseFloat(operand1) - parseFloat(operand2);
        case '*':
            return parseFloat(operand1) * parseFloat(operand2);
        case '/':
            return parseFloat(operand1) / parseFloat(operand2);
        default:
            throw new Error('Invalid operator');
    }
}
describe('rpnCalculator', () => {
    it('should return the correct value for various operations in order', () => {
         expect(compute("3 4 +")).toBe(7);
         expect(compute('10 5 -')).toBe(5);
         expect(compute('2 3 *')).toBe(6);
         expect(compute('8 4 /')).toBe(2);
    });
    it('should handle unitary operations', () => {
        expect(compute('9 sqrt')).toBeCloseTo(3);
    });
    it('should handle combination of expressions longer than 3')
    expect(compute("5 4 sqrt 3 + -")).toBe(7);
    expect(compute('2 6 sqrt 8 + -')).toBe(5);
    expect(compute('1 8 3 + sqrt -')).toBe(6);
    expect(compute('4 2 6 sqrt + -')).toBe(2);

});
