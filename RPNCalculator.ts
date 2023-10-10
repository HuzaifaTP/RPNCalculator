// Create an empty stack (First-In-First-Out)

 import {Character} from "./Character";

function calculate(token: Character, number1: Character, number2: Character): number {
    switch (token.character) {
        case '+':
            return parseFloat(number2.character) + parseFloat(number1.character);
        case '-':
            return parseFloat(number2.character) - parseFloat(number1.character);
        case '*':
            return parseFloat(number2.character) * parseFloat(number1.character);
        case '/':
            if(parseFloat(number1.character) === 0) {
                throw new Error('Division by zero');
            }
            return parseFloat(number2.character) / parseFloat(number1.character);
        default:
            throw new Error('Invalid operation');
    }
}

export class RPNCalculator {
    stack: Character[];

    constructor() {
        this.stack = []; // Initialize an empty stack
    }

    evaluate(expression: string): number {
        const characters = expression.split("");

        for (const characterString of characters) {
            const token = new Character(characterString);
            if (token.isNumber()) {
                this.stack.push(token);
            } else if (token.isOperator()) {
                const number1 = this.stack.pop();
                const number2 = this.stack.pop();
                if (number1 && number2) {
                    const value = calculate(token, number1, number2);
                    this.stack.push(new Character(value.toString()));
                } else {
                    throw new Error('Insufficient operands');
                }
            }
        }
        const result = this.stack.pop();
        if (result) {
            return parseFloat(result.character);
        } else {
            throw new Error('Invalid expression');
        }
    }
}
