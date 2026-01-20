const tmdb = {
  baseUrl: "https://api.themoviedb.org/3",
  imgUrl: "https://image.tmdb.org/t/p/",
  userToken: "",
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

export default tmdb;
