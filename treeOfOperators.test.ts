interface ExpressionVisitor<T> {
    visitLiteral(expression: Literal): T;
    visitAddition(expression: Addition): T;
    visitSubtraction(expression: Subtraction): T;
    visitMultiplication(expression: Multiplication): T;
    visitDivision(expression: Division): T;
    visitSquareRoot(expression: SquareRoot): T;
}

//expression priority, parenthesis
class RPNPrinter implements ExpressionVisitor<string> {
    visitAddition(expression: Addition): string {
        return `${expression.left.visit(this)} ${expression.right.visit(this)} +`;
    }
    visitDivision(expression: Division): string {
        return undefined;
    }
    visitLiteral(expression: Literal): string {
        return expression.value.toString();
    }
    visitMultiplication(expression: Multiplication): string {
        return undefined;
    }
    visitSquareRoot(expression: SquareRoot): string {
        return undefined;
    }
    visitSubtraction(expression: Subtraction): string {
        return undefined;
    }
}

class Evaluator implements ExpressionVisitor<number> {
    visitAddition(expression: Addition): number {
        return expression.left.visit(this) + expression.right.visit(this)
    }

    visitDivision(expression: Division): number {
        return expression.left.visit(this) / expression.right.visit(this)
    }

    visitLiteral(expression: Literal): number {
        return expression.value
    }

    visitMultiplication(expression: Multiplication): number {
        return expression.left.visit(this) * expression.right.visit(this)
    }

    visitSquareRoot(expression: SquareRoot): number {
        return Math.sqrt(expression.visit(this));
    }

    visitSubtraction(expression: Subtraction): number {
        return expression.left.visit(this) - expression.right.visit(this)
    }

}

interface Expression {
    visit<T>(visitor: ExpressionVisitor<T>): T;
}

class Literal implements Expression {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    visit<T>(visitor: ExpressionVisitor<T>): T {
        return visitor.visitLiteral(this)
    }
}

class Addition implements Expression {
    left: Expression;
    right: Expression;

    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    visit<T>(visitor: ExpressionVisitor<T>): T {
        return visitor.visitAddition(this)
    }
}

class Subtraction implements Expression {
    left: Expression;
    right: Expression;

    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    visit<T>(visitor: ExpressionVisitor<T>): T {
        return visitor.visitSubtraction(this)
    }
}

class Multiplication implements Expression {
    left: Expression;
    right: Expression;

    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    visit<T>(visitor: ExpressionVisitor<T>): T {
        return visitor.visitMultiplication(this)
    }
}

class Division implements Expression {
    left: Expression;
    right: Expression;

    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    visit<T>(visitor: ExpressionVisitor<T>): T {
        return visitor.visitDivision(this)
    }
}

class SquareRoot implements Expression {
    private operand: Expression;

    constructor(operand: Expression) {
        this.operand = operand;
    }

    visit<T>(visitor: ExpressionVisitor<T>): T {
        return visitor.visitSquareRoot(this)
    }
}

const binaryOperation = (operation: (left: Expression, right: Expression) => Expression) => {
    return function process(stack: Expression[]) {
        const right = stack.pop()
        const left = stack.pop()
        stack.push(operation(left, right))
    }
}
const unaryOperation = (operation: (operand: Expression) => Expression) => {
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
const unaryOperations = {};


class RPNCalculator {
    static parseExpression(expression: string): Expression | undefined {
        const stack: Expression[] = [];
        const tokens = expression.split(' ');

        for (const token of tokens) {
            if (token in operatorDictionary)
                operatorDictionary[token](stack)
            else {
                stack.push(new Literal(parseFloat(token)));
            }
        }
        return stack.pop();
    }
}

describe('rpnCalculator', () => {
    it('should return the correct value for various operations in order', () => {
        expect(RPNCalculator.parseExpression("3 4 +")?.visit(new Evaluator())).toBe(7);
        expect(RPNCalculator.parseExpression('10 5 -')?.visit(new Evaluator())).toBe(5);
        expect(RPNCalculator.parseExpression('2 3 *')?.visit(new Evaluator())).toBe(6);
    });

    it('should return the correct display for various operations ', () => {
        expect(RPNCalculator.parseExpression("3 4 +")?.visit(new RPNPrinter())).toBe("3 4 +");
    });
});



