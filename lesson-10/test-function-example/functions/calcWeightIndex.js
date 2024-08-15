const calcWeightIndex = (weight, height)=> {
    if(weight === undefined || height === undefined) {
        throw new Error('weight and height required');
    }

if(typeof weight !== "number" || typeof height !== "number") {
    throw new Error('weight and heigt must be number');
}

    if(weight < height) {
        throw new Error('weight first argument and heigh - second');
    }

    const result = (weight / (height ** 2)).toFixed(2);

    return Number(result);
}

export default calcWeightIndex;