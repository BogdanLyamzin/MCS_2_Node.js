import {Router} from "express";

import moviesControllers from "../controllers/moviesControllers.js";

import validateBody from "../decorators/validateBody.js";

import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

import {movieAddSchema, movieUpdateSchema} from "../schemas/moviesSchemas.js";

const addMovieMiddleware = validateBody(movieAddSchema);
const updateMovieMiddleware = validateBody(movieUpdateSchema);

const moviesRouter = Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", moviesControllers.getMovies);

moviesRouter.get("/:id", moviesControllers.getMovieById);

// upload.fields([{name: "poster", maxCount: 1}, {name: "subposter", maxCount: 4}])
// upload.array("poster", 8)
moviesRouter.post("/", upload.single("poster"), addMovieMiddleware, moviesControllers.addMovie);

moviesRouter.put("/:id", updateMovieMiddleware, moviesControllers.updateMovieById);

moviesRouter.delete("/:id", moviesControllers.deleteMovieById);

export default moviesRouter;