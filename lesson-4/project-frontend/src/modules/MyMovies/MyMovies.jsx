import { useState, useEffect } from "react";

import MyMoviesAddForm from "../MyMoviesAddForm/MyMoviesAddForm";
import MovieList from "./MoviesList/MovieList";

import styles from "./my-movies.module.css";

const MyMovies = ()=> {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    const addMovie = async(data)=> {
        console.log(data);
    }

    const deleteMovie = async(id)=> {

    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.block}>
                <MyMoviesAddForm formSubmit={addMovie} />
            </div>
            <div className={styles.block}>
                <MovieList items={movies} onDelete={deleteMovie} />
            </div>
        </div>
    )

}

export default MyMovies;