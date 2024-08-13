import * as fs from "node:fs/promises";

import * as moviesServices from "../services/moviesServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

import cloudinary from "../helpers/cloudinary.js";

const getMovies = async (req, res) => {
    const {id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const result = await moviesServices.getMovies({owner}, {page, limit});

    res.json(result);
}

const getMovieById = async (req, res) => {
    const { id } = req.params;
    const {id: owner} = req.user;

    const result = await moviesServices.getMovie({id, owner});
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const addMovie = async (req, res) => {
    const {url: poster} = await cloudinary.uploader.upload(req.file.path, {
        folder: "posters"
    });
    await fs.unlink(req.file.path);
    const {id: owner} = req.user;
    const result = await moviesServices.addMovie({...req.body, poster, owner});

    res.status(201).json(result);
}

const updateMovieById = async (req, res) => {
    const { id } = req.params;
    const {id: owner} = req.user;

    const result = await moviesServices.updateMovie({id, owner}, req.body);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const deleteMovieById = async (req, res) => {
    const { id } = req.params;
    const {id: owner} = req.user;

    const result = await moviesServices.deleteMovie({id, owner});
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