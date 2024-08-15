import calcWeightIndex from "./calcWeightIndex.js";

/*
90, 1.9 => 24.93
1.9, 90 => error 'weight first argument and heigh - second'
90 => error 'weight and height required'
'90', '1.9' => error 'weight and heigt must be number'
*/

describe("test calcWeightIndex function", ()=> {
    test("90, 1.9 => 24.93", ()=> {
        const result = calcWeightIndex(90, 1.9);
        expect(result).toBe(24.93);

        /*
        const expect = result => {
            return {
                result,
                toBe(value) {
                    this.result === value;
                }
            }
        }
        */
    })

    test("1.9, 90 => error 'weight first argument and heigh - second'", ()=>{
        expect(()=> calcWeightIndex(1.9, 90)).toThrow('weight first argument and heigh - second');
    })

    test("90 => error 'weight and height required'", ()=>{
        expect(()=> calcWeightIndex(90)).toThrow('weight and height required');
    })

    it("'90', '1.9' => error 'weight and heigt must be number'", ()=>{
        expect(()=> calcWeightIndex('90', '1.9')).toThrow('weight and heigt must be number');
    })
})