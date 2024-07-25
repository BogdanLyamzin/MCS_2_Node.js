import {Router} from "express";

import moviesControllers from "../controllers/moviesControllers.js";

const moviesRouter = Router();

moviesRouter.get("/", moviesControllers.getMovies);

moviesRouter.get("/:id", moviesControllers.getMovieById);

moviesRouter.post("/", moviesControllers.addMovie);

moviesRouter.put("/:id", moviesControllers.updateMovieById);

moviesRouter.delete("/:id", moviesControllers.deleteMovieById);

export default moviesRouter;