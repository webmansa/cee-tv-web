import tmdb from "src/config/tmdb/exports";

export function getImdbImageUrl(filePath: string, size = "w500") {
  if (!filePath) {
    return null;
  }
  return `${tmdb.imgUrl}${size}${filePath}`;
}
