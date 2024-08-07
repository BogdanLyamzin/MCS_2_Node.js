import {Router} from "express";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../decorators/validateBody.js";

import {authSignupSchema} from "../schemas/authSchemas.js";

const signupMiddleware = validateBody(authSignupSchema);

const authRouter = Router();

authRouter.post("/signup", signupMiddleware, authControllers.signup);

authRouter.post("/signin", signupMiddleware, authControllers.signin);

export default authRouter;