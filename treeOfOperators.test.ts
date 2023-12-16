import any = jasmine.any;

interface Expression {
    evaluate(): number;
}
class Literal implements Expression {
    private value: number;
    constructor(value: number) {
        this.value = value;
    }
    evaluate(): number {
        return this.value;
    }
}
class Addition implements Expression {
    private left: Expression;
    private right: Expression;
    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }
    evaluate(): number {
        return this.left.evaluate() + this.right.evaluate();
    }
}
class Subtraction implements  Expression {
    private left: Expression;
    private right: Expression;

    constructor(left: Expression, right: Expression) {
     this.left = left;
     this.right = right;
    }
    evaluate(): number {
        return this.left.evaluate() - this.right.evaluate()
    }
}
class Multiplication implements Expression{
    private left: Expression;
    private right: Expression;

    constructor( left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }
    evaluate():number{
        return this.left.evaluate() * this.right.evaluate()
    }
}

class Division implements Expression {
    private left: Expression;
    private right: Expression;

    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    evaluate(): number {
        if (this.right.evaluate() === 0) {
            throw new Error("Division by zero");
        }
        return this.left.evaluate() / this.right.evaluate();
    }
}
class SquareRoot implements Expression {
    private operand: Expression;

    constructor(operand: Expression) {
        this.operand = operand;
    }

    evaluate(): number {
        const result = this.operand.evaluate();
        if (result < 0) {
            throw new Error("Square root of negative number");
        }
        return Math.sqrt(result);
    }
}
const binaryOperation = (operation: (left: Expression, right: Expression) => Expression) => {
   return function process(stack: Expression[]){
       const left = stack.pop()
       const right = stack.pop()
       stack.push(operation(left,right))
   }
}
const unaryOperation = (operation: (operand: Expression)=>Expression) => {
    return function process(stack: Expression[]) {
        const expression = stack.pop()
        stack.push(operation(operation(expression)))
    }
}

const operatorDictionary = {
    '+': binaryOperation((left: Expression, right: Expression) => new Addition(left, right)),
    '-': binaryOperation((left: Expression, right: Expression) => new Subtraction(left, right)),
    '*': binaryOperation((left: Expression, right: Expression) => new Multiplication(left, right)),
    '/': binaryOperation((left: Expression, right: Expression) => new Division(left, right)),
    'sqrt': unaryOperation((operand: Expression) => new SquareRoot(operand)),

};
const unaryOperations = {
};


class RPNCalculator {
    static parseExpression(expression: string): Expression {
        const stack: Expression[] = [];
        const tokens = expression.split(' ');

        for (const token of tokens) {
            switch (token) {
                case '+':
                case '-':
                case '*':
                case '/':
                    const right = stack.pop();
                    const left = stack.pop();
                    stack.push(binaryOperations[token](left, right));
                    break;
                case 'sqrt':
                    const expressionFromStack = stack.pop();
                    stack.push(unaryOperations[token](expressionFromStack))
                    break;
                default:
                    stack.push(new Literal(parseFloat(token)));
            }
        }

        return stack.pop();
    }
}

describe('rpnCalculator', () => {
    it('should return the correct value for various operations in order', () => {
        expect(RPNCalculator.parseExpression("3 4 +").evaluate()).toBe(7);
        expect(RPNCalculator.parseExpression('10 5 -').evaluate()).toBe(5);
        expect(RPNCalculator.parseExpression('2 3 *').evaluate()).toBe(6);
    });
});



