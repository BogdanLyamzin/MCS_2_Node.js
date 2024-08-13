import Movie from "../db/models/Movie.js";

export const getMovies = (query = {}, pagination = {}) => {
    const {page = 1, limit = 10} = pagination;
    const normalizedLimit = Number(limit);
    const offset = (Number(page) - 1) * normalizedLimit;

    return Movie.findAll({
        where: query,
        offset,
        limit: normalizedLimit,
    });
};

export const getMovie = (query) => Movie.findOne({
    where: query
});

// export const getMovieById = id => Movie.findByPk(id);

export const addMovie = data => Movie.create(data);

export const updateMovie = async (query, data) => {
    const movie = await getMovie(query);
    if(!movie) {
        return null;
    }
    return movie.update(data, {
        returning: true,
    });
}

export const deleteMovie = async (query) => Movie.destroy({
    where: query
})