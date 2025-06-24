import { createFileRoute } from '@tanstack/react-router'
import { MovieCard } from 'src/components/MovieCard/MovieCard'
import { MovieCardSkeleton } from 'src/components/MovieCardSkeleton'
import { Title } from 'src/components/Title/Title'
import { PageLayout } from 'src/layouts/PageLayout'
import { useGetAllFavoriteSeries } from 'src/services/queries/useGetAllFavoriteSeries'

export const Route = createFileRoute('/favorites')({
    component: Favorites,
})

function Favorites() {

    // use a promise all to get all watchlist from series and movies
    const { data, isLoading } = useGetAllFavoriteSeries()

    return <PageLayout content={<>
        <div className="h-lvh flex items-center flex-col">
            <Title text="Plan to watch" style={{ color: '#FAF8F5' }} />
            {isLoading ? <MovieCardSkeleton /> : data?.map((item) => <MovieCard title={item.title} imgUrl={item.image} year="df" />)}
        </div>
    </>} />
}
