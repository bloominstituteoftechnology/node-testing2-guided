 const calc = require ('../calculator');
 
 
 
 

it('multiplies',()=> {
    expect(calc.multiply(8,8)).toBe(64)
});

it('adds', ()=> {
    expect(calc.add(4,5)).toBe(9)
})
it('minuses', ()=> {
    expect(calc.minus(8,4)).toBe(4)
})