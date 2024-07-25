import MovieListItem from "./MovieListItem";

const MovieList = ({items = [], onDelete})=> {

    const elements = items.map(item => <MovieListItem id={id} {...item} onDelete={onDelete} />);

    return (
        <ul>
            {elements}
        </ul>
    )
}

export default MovieList;