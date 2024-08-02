import {Router} from "express";

import moviesControllers from "../controllers/moviesControllers.js";

import validateBody from "../decorators/validateBody.js";

import {movieAddSchema, movieUpdateSchema} from "../schemas/moviesSchemas.js";

const addMovieMiddleware = validateBody(movieAddSchema);
const updateMovieMiddleware = validateBody(movieUpdateSchema);

const moviesRouter = Router();

moviesRouter.get("/", moviesControllers.getMovies);

moviesRouter.get("/:id", moviesControllers.getMovieById);

moviesRouter.post("/", addMovieMiddleware, moviesControllers.addMovie);

moviesRouter.put("/:id", updateMovieMiddleware, moviesControllers.updateMovieById);

moviesRouter.delete("/:id", moviesControllers.deleteMovieById);

export default moviesRouter;