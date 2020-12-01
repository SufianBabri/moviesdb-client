import http from "./httpService";

const apiEndpoint = "movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getMovies() {
  return await http.get(apiEndpoint);
}

export async function getMovie(id) {
  return await http.get(movieUrl(id));
}

export async function saveMovie(movie) {
  if (movie._id !== "new") {
    const body = { ...movie };
    delete body._id;
    return await http.put(movieUrl(movie._id), body);
  }
  return await http.post(apiEndpoint, movie);
}

export async function deleteMovie(id) {
  return await http.delete(apiEndpoint + "/" + id);
}
