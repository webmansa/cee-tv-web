import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from 'src/layouts/PageLayout'
import { useGetMovieDetail } from 'src/services/useGetMovieDetail'
import { getImdbImageUrl } from 'src/utils/getImdbImageUrl'

export const Route = createFileRoute('/movie')({
  component: MovieDetail,
})

function MovieDetail() {
    const movieId = Route.useLoaderData()

    console.log(movieId)

    const { data, isLoading } = useGetMovieDetail(movieId || '')
    console.log(data, 'movie detail')

    return (
        <PageLayout content={
            <>
                {
                    isLoading ? <div> is loading...</div> : <div>
                        <img src={getImdbImageUrl(data.poster_path, 'w400') || ''} alt={data.title} />
                    </div>
               }
            </>
        } />
    )
}
