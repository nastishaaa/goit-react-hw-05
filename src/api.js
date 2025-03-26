import axios from "axios";

export default async function findMoviesAPI(value) {
    
    const API_KEY = '65e63a43c258a7dd70aa0c13e1b1fe41';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`;
    
    const data = await axios.get(url);
    console.log(data.data.results);

    return data.data.results;
}
