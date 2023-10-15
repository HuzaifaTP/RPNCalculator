
//Assumption: MAX kept at 2
function compute(expression) {
    if(/^\d+$/.test(expression) || containsOnlyValidOperators(expression)){
        throw new Error("expression invalid")
    }
    var numberStack = []
    const tokens = expression.split(' ');
    for(const token of tokens){
        if(isNumber(token)){
            numberStack.push(token)
        } else if (isOperator(token)){
            if(token == 'SQRT'){
                numberStack.push(Math.round(Math.sqrt(parseFloat(numberStack.pop()))))
            } else {
                const operand1 = numberStack.pop();
                const operand2 = numberStack.pop();

                switch (token) {
                    case '+':
                        numberStack.push(parseFloat(operand2) + parseFloat(operand1));
                        break;
                    case '-':
                        numberStack.push(parseFloat(operand2) - parseFloat(operand1));
                        break;
                    case '*':
                        numberStack.push(Math.round(parseFloat(operand1) * parseFloat(operand2)));
                        break;
                    case '/':
                        numberStack.push(parseFloat(operand2) / parseFloat(operand1));
                        break;
                    case 'MAX':
                        numberStack.push(Math.max(parseFloat(operand1) , parseFloat(operand2)));
                        break;
                    default:
                        throw new Error('Invalid operator');
                }
            }
        }
    }
    return numberStack.pop();
}

function containsOnlyValidOperators(expression: string): boolean {
    const tokens = expression.split(' ');
    for (const token of tokens) {
        if (!isOperator(token)||isNumber(token)) {
            return false;
        }
    }
    return true;
}
function isNumber(token): boolean {
    return !isNaN(parseFloat(token));
}
function isOperator(token): boolean {
    const operators = ['+', '-', '*', '/', 'MAX', 'SQRT'];
    for (const operator of operators) {
        if (operator === token) {
            return true;
        }
    }
    return false;
}
describe('rpnCalculator', () => {

    it('should throw error if only operands exists', ()=>{
        expect(() => compute("1")).toThrowError("expression invalid");
        expect(() => compute("22")).toThrowError("expression invalid");
        expect(() => compute("333")).toThrowError("expression invalid");
        expect(() => compute("4444")).toThrowError("expression invalid");
        expect(() => compute("55555")).toThrowError("expression invalid");
    })

    it('should throw error if only operators exists', ()=>{
        expect(() => compute("+ - * / MAX SQRT")).toThrowError("expression invalid");
        expect(() => compute("+ - * / MAX")).toThrowError("expression invalid");
        expect(() => compute("+ - * /")).toThrowError("expression invalid");
        expect(() => compute("+ - *")).toThrowError("expression invalid");
        expect(() => compute("+ -")).toThrowError("expression invalid");
        expect(() => compute("+")).toThrowError("expression invalid");
    })

    it('should return the correct value for various operations in order', () => {
        expect(compute("3 4 +")).toBe(7);
        expect(compute('10 5 -')).toBe(5);
        expect(compute('2 3 *')).toBe(6);
        expect(compute('8 4 /')).toBe(2);
        expect(compute('8 4 MAX')).toBe(8);
        expect(compute('8 8 MAX')).toBe(8);
        expect(compute('9 SQRT')).toBe(3);
    });


    it('should handle combination of expressions longer than 3', ()=>{
        expect(compute("5 4 SQRT 3 + -")).toBe(0);
        expect(compute('2 6 SQRT 8 + -')).toBe(-8);
        expect(compute('1 8 3 + SQRT -')).toBe(-2);
        expect(compute('4 2 6 SQRT + -')).toBe(0);
    })
});
