const fs = require("node:fs/promises");
const path = require("node:path");

const moviesPath = path.join(__dirname, "movies.json");
console.log(moviesPath);

const getMovies = async()=> {
    const data = await fs.readFile("./movies/movies.json", "utf-8");
    return JSON.parse(data);
}