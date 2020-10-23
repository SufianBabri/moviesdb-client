import http from "./httpService";

const apiEndpoint = "genres";

export async function getGenres() {
  return await http.get(apiEndpoint);
}
