const tmdb = {
  baseUrl: "https://api.themoviedb.org/3",
  imgUrl: "https://image.tmdb.org/t/p/",
  userToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTkyZGNmYjBhZTE0MTA3MmIwNDdjYjQ4YTkxNjVmZCIsIm5iZiI6MTU5ODAyNTE5Ny44MTcsInN1YiI6IjVmM2ZlZGVkYzE3NWIyMDAzNjYxOWUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o73X5jO6GNjTXdAAQfyL6P0lZU5b1YR0TS1gQ7N-PvE",
  get movies() {
    return "/discover/movie";
  },
  get movieDetail() {
    return "/movie";
  },
  get series() {
    return "/trending/tv/week?language=en-US";
  },
  get seriesDetail() {
    return "/tv";
  },
  get popular() {
    return "/movie/popular?language=en-US&page=1";
  },
  get find() {
    return "";
  },
  get upcoming() {
    return "/movie/upcoming";
  },
  get search() {
    return "/search/multi?query=";
  },
};

// import.meta.env.API_URL,
// "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
// ?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc
export default tmdb;
