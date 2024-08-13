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

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
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
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout,
}