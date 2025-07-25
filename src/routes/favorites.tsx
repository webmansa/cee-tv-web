import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from 'src/components/Container'
import { MovieCard } from 'src/components/MovieCard/MovieCard'
import { MovieCardSkeleton } from 'src/components/MovieCardSkeleton'
import { Title } from 'src/components/Title/Title'
import { PageLayout } from 'src/layouts/PageLayout'
import { useGetAllFavoriteMovie } from 'src/services/queries/useGetAllFavoriteMovie'
import { useGetAllFavoriteSeries } from 'src/services/queries/useGetAllFavoriteSeries'

export const Route = createFileRoute('/favorites')({
    component: Favorites,
})

function Favorites() {

    // use a promise all to get all watchlist from series and movies
    const { data, isLoading } = useGetAllFavoriteSeries()
    const { data: favoritesMovies, isLoading: isFavoriteMovieLoading } = useGetAllFavoriteMovie()


    return <PageLayout content={<>
        <div className="h-screen flex items-center flex-col">
            <Title text="Plan to watch" />

            <Container text="Movies">
                {isFavoriteMovieLoading ? <MovieCardSkeleton /> :

                    favoritesMovies?.map((item) => <MovieCard title={item.title} imgUrl={item.image || ''} year={item.year} />)
                }
            </Container>

            <Container text="Series">
                {isLoading ? <MovieCardSkeleton /> : data?.map((item) => (
                    <Link to="/series/$id" params={{ id: item.movieID }} key={item.id}>
                        <MovieCard title={item.title} imgUrl={item.image || ''} year={item.year} />
                    </Link>
                ))}
            </Container>
        </div>
    </>} />
}
