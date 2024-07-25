const MovieListItem = ({id, title, director, onDelete})=> {
    const handleDelete = ()=> onDelete(id);

    return <li>Title: {title}. Director: {director}. <button onClick={handleDelete} type="button">delete</button></li>
}

export default MovieListItem;