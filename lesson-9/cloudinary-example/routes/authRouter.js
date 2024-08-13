import {Router} from "express";

import authControllers from "../controllers/authControllers.js";

import authenticate from "../middlewares/authenticate.js";

import validateBody from "../decorators/validateBody.js";

import {authSignupSchema} from "../schemas/authSchemas.js";

const signupMiddleware = validateBody(authSignupSchema);

const authRouter = Router();

authRouter.post("/signup", authControllers.signup);

authRouter.post("/signin", signupMiddleware, authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/signout", authenticate, authControllers.signout);

export default authRouter;