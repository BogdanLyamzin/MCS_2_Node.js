import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;

const payload = {
    id: 25,
};

const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
// console.log(token);
const decodeToken = jwt.decode(token);
// console.log(decodeToken);

try {
    const {id} = jwt.verify(token, JWT_SECRET);
    console.log(id);
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTcyMjk2ODYxNiwiZXhwIjoxNzIzMDU1MDE2fQ.OKxQBjiLR1v6v0AUfM6UIIN1t3Q6rYg7QE9MnELKNEC";
    jwt.verify(invalidToken, JWT_SECRET);
}
catch(error) {
    console.log(error.message);
}