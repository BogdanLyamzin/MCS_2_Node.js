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

// invokeAction({action: "getAll"});
// invokeAction({action: "getById", id: "u9kgwNWGi3uUUwh0b8V48"});
// invokeAction({action: "add", title: "Avatar: way of water", director: "James Cameron"});
// invokeAction({action: "updateById", id: "neohR26j8ykdUt4VT6NKX", title: "Avatar: Way of water"});
// invokeAction({action: "deleteById", id: "neohR26j8ykdUt4VT6NKX"});
