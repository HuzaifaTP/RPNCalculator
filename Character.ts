
interface CharacterInterface{
    character:string;
    isOperator():boolean;
    isNumber():boolean;
}

export class Character implements CharacterInterface{
    character: string;

    constructor(character:string) {
        this.character=character
    }

    isNumber(): boolean {
        return !isNaN(parseFloat(this.character));
    }

    isOperator(): boolean {
        const operators = ['+', '-', '*', '/'];
        for (const operator of operators) {
            if (operator === this.character) {
                return true;
            }
        }
        return false;
    }

}

