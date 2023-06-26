// Create an empty stack (First-In-First-Out)

 import {Character} from "./Character";

function calculate(token: Character, number1: Character, number2: Character) {
    return
}

class RPNCalculator{

    stack: Character[];

     constructor() {
         this.stack = []; // Initialize an empty stack
     }
     evaluate(expression:string){
         const characters = expression.split("");

         for(const characterString in characters){
          const token = new Character(characterString);
          if(token.isNumber()){
              this.stack.push(token);
          }else if(token.isOperator()){
              const number1 = this.stack.pop();
              const number2 = this.stack.pop();
              const value = calculate(token,number1,number2)
          }
         }
     }
 }
