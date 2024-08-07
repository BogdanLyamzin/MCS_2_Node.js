import bcrypt from "bcrypt";

import User from "../db/models/User.js";

export const findUser = query => User.findOne({
    where: query,
})

export const signup = async data => {
    try {
        const {password} = data;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({...data, password: hashPassword});
        return newUser;
    }
    catch(error) {
        if(error?.parent?.code === "23505") {
            error.message = "Email already in user";
        }
        throw error;
    }
};