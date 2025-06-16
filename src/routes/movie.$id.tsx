import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from 'src/layouts/PageLayout'
import { useGetMovieDetail } from 'src/services/useGetMovieDetail'
import { getImdbImageUrl } from 'src/utils/getImdbImageUrl'

export const Route = createFileRoute('/movie/$id')({
    loader: ({ params: { id } }) => id,
    component: MovieDetail,
})

function MovieDetail() {
    const movieId = Route.useLoaderData()

    const { data, isLoading } = useGetMovieDetail(movieId)

    return (
        <PageLayout content={
            <>
                {
                    isLoading ? <div> is loading...</div> : <div>
                        <img src={getImdbImageUrl(data?.poster_path || '', 'w400') || ''} alt={data?.title} />
                    </div>
                }
                
                <div className="p-4 relative" style={{ background: '#FAF8F5' }}>
                    
                    <div className="mb-3 flex absolute right-4">
                        <img src="/src/images/icons/favorite.svg" className="w-[30px]" />
                    </div>
                    <div className="flex gap-2">
                        <span className="font-bold">ratings: <em style={{ color: '#005082' }}>{data?.vote_average ? data.vote_average : 'N/A'}</em></span>
                        <span className="font-bold">status: <em className="text-sm" style={{ color: '#005082' }}>{data?.status}</em></span>
                    </div>

                    <h3 className="font-bold mt-3 text-lg">{data?.title}</h3>

                    <p className="font-light">{data?.overview}</p>

                    <div className="grid grid-cols-2 items-center mt-4">
                        <div className="font-bold">Genre:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>{data?.genres.map(({ name}) => name).join(', ')}</span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className="font-bold">Year:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>
                            {data?.release_date ? new Date(data.release_date).toLocaleDateString() : 'N/A'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className="font-bold">Production:</div>
                        <span className="gen font-medium text-sm text-ellipsis inline-flex" style={{ color: '#005082' }}>{data?.production_companies.map(({ name}) => name).join(', ')}</span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className='font-bold'>Runtime:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>{data?.runtime} mins</span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className="font-bold">Origin Language:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>{data?.spoken_languages[0].english_name}</span>
                    </div>
                </div>
            </>
        } />
    )
}
