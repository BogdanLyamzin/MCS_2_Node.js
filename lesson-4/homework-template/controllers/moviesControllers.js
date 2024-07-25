import * as moviesServices from "../services/moviesServices.js";

import HttpError from "../helpers/HttpError.js";

import { movieAddSchema, movieUpdateSchema } from "../schemas/moviesSchemas.js";

const getMovies = async (req, res, next) => {
    try {
        const result = await moviesServices.getMovies();

        res.json(result);
    }
    catch (error) {
        next(error);
    }
}

const getMovieById = async(req, res, next)=> {
    try {
        const {id} = req.params;

        const result = await moviesServices.getMovieById(id);
        if(!result) {
            throw HttpError(404, `Movie with id=${id} not found`);
            // const error = new Error(`Movie with id=${id} not found`);
            // error.status = 404;
            // throw error;
            // return res.status(404).json({
            //     message: `Movie with id=${id} not found`,
            // });
        }
    
        res.json(result);
    }
    catch(error) {
        next(error);
    }
}

const addMovie = async(req, res, next)=> {
    try {
        const {error} = movieAddSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }
        const result = await moviesServices.addMovie(req.body);

        res.status(201).json(result);
    }
    catch(error){
        next(error);
    }
}

const updateMovieById = async(req, res, next)=> {
    try {
        const {error} = movieUpdateSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }

        const {id} = req.params;

        const result = await moviesServices.updateById(id, req.body);
        if(!result) {
            throw HttpError(404, `Movie with id=${id} not found`);
        }

        res.json(result);
    }
    catch(error) {
        next(error);
    }
}

const deleteMovieById = async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await moviesServices.deleteById(id);
        if(!result) {
            throw HttpError(404, `Movie with id=${id} not found`);
        }

        // res.status(204).send();

        res.json({
            message: "Movie delete successfuly"
        })
    }
    catch(error) {
        next(error);
    }
}

export default {
    getMovies,
    getMovieById,
    addMovie,
    updateMovieById,
    deleteMovieById,
}