import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

import User from "../db/models/User.js";

import sendEmail from "../helpers/sendEmail.js";

const {BASE_URL} = process.env;

export const findUser = query => User.findOne({
    where: query,
})

export const updateUser = async (query, data) => {
    const user = await findUser(query);
    if(!user) {
        return null;
    }
    return user.update(data, {
        returning: true,
    });
}

export const sendVerifyEmail = (email, verificationCode) => {
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
    };

    return sendEmail(verifyEmail);
}

export const signup = async data => {
    try {
        const {password} = data;
        const hashPassword = await bcrypt.hash(password, 10);
        const verificationCode = nanoid();
        const newUser = await User.create({...data, password: hashPassword, verificationCode});
        
        await sendVerifyEmail(data.email, verificationCode);

        return newUser;
    }
    catch(error) {
        if(error?.parent?.code === "23505") {
            error.message = "Email already in user";
        }
        throw error;
    }
};