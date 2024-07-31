import * as moviesServices from "../services/moviesServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

const getMovies = async (req, res) => {
    const result = await moviesServices.getMovies();

    res.json(result);
}

const getMovieById = async (req, res) => {
    const { id } = req.params;

    const result = await moviesServices.getMovieById(id);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const addMovie = async (req, res) => {
    const result = await moviesServices.addMovie(req.body);

    res.status(201).json(result);
}

const updateMovieById = async (req, res) => {
    const { id } = req.params;

    const result = await moviesServices.updateById(id, req.body);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const deleteMovieById = async (req, res) => {
    const { id } = req.params;
    const result = await moviesServices.deleteById(id);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    // res.status(204).send();

    res.json({
        message: "Movie delete successfuly"
    })
}

export default {
    getMovies: ctrlWrapper(getMovies),
    getMovieById: ctrlWrapper(getMovieById),
    addMovie: ctrlWrapper(addMovie),
    updateMovieById: ctrlWrapper(updateMovieById),
    deleteMovieById: ctrlWrapper(deleteMovieById),
}