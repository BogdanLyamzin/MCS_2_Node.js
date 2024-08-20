import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authServices from "../services/authServices.js";
import {getMovies} from "../services/moviesServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

const {JWT_SECRET} = process.env;

const signup = async (req, res) => {
    const newUser = await authServices.signup(req.body);

    res.status(201).json({
        email: newUser.email,
    })
}

const verify = async(req, res)=> {
    const {verificationCode} = req.params;
    const user = await authServices.findUser({verificationCode});
    if(!user) {
        throw HttpError(404, "User not found or already verify");
    }

    await authServices.updateUser({verificationCode}, {
        verify: true,
        verificationCode: null,
    });

    res.json({
        message: "Email verified success"
    })

}

const resendVerify = async(req, res)=> {
    const {email} = req.body;
    const user = await authServices.findUser({email});
    if(!user) {
        throw HttpError(404, "Email not found");
    }

    if(user.verify) {
        throw HttpError(400, "Email already verified");
    }

    await authServices.sendVerifyEmail(user.email, user.verificationCode);

    res.json({
        message: "Verify email resend successfully"
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }
    if(!user.verify) {
        throw HttpError(401, "Email not verify");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const {id} = user;

    const movies = await getMovies({owner: id});

    const payload = {
        id,
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "24h"});
    await authServices.updateUser({id}, {token});

    res.json({
        token,
        movies,
    })
}

const getCurrent = async(req, res)=> {
    const {email, id} = req.user;
    const movies = await getMovies({owner: id});

    res.json({
        email,
        movies,
    })
}

const signout = async(req, res)=> {
    const {id} = req.user;
    await authServices.updateUser({id}, {token: ""});

    res.json({
        message: "Logout success"
    })
}

export default {
    signup: ctrlWrapper(signup),
    verify: ctrlWrapper(verify),
    resendVerify: ctrlWrapper(resendVerify),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout,
}