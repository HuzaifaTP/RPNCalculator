
export class RPNCalculator {
    private stack: string[] = [];

    push(value: string) {
        this.stack.push(value);
    }
    pop(): string | undefined {
        return this.stack.pop();
    }
}


describe('RPNCalculator', () => {
    let calculator: RPNCalculator;

    beforeEach(() => {
        calculator = new RPNCalculator();
    });

    test('should allow pushing and popping a value', () => {
        calculator.push('5');
        expect(calculator.pop()).toBe('5');
    });
});
