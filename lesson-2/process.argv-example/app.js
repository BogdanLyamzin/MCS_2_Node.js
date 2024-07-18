import { getMovies, getMovieById, addMovie, updateById, deleteById } from "./movies/index.js";

const invokeAction = async({action, id, ...data})=> {
    switch(action) {
        case "getAll":
            const movies = await getMovies();
            return console.log(movies);
        case "getById":
            const oneMovie = await getMovieById(id);
            return console.log(oneMovie);
        case "add":
            const newMovie = await addMovie(data);
            return console.log(newMovie);
        case "updateById":
            const updateMovie = await updateById(id, data);
            return console.log(updateMovie);
        case "deleteById":
            const deleteMovie = await deleteById(id);
            return console.log(deleteMovie);
        default:
            console.log("Unknown action");
    }
}

const actionIndex = process.argv.indexOf("--action");
if(actionIndex !== -1) {
    const action = process.argv[actionIndex + 1];
    invokeAction({action})
}