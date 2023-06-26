
function compute(expression) {
    return expression
}

describe('myFunction', () => {
    it('should return the correct value', () => {
         expect(compute("1")).toBe("1")
         expect(compute("100")).toBe("100")

    });


});
