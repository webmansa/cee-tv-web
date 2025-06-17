import { createFileRoute, Link } from '@tanstack/react-router'
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

    console.log(data)
    return (
        <PageLayout content={
            <div className="relative">
                <Link to='/'>
                    <div className="rotate-180 w-[40px] h-[40px] rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-90 absolute left-4 top-4" style={{ background: '#ffffff33' }}>
                        <svg width="16.768" height="17.499" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="back 1" clipPath="url(#clip0_163_415)">
                                <g id="Group">
                                    <path id="Chevron Right" d="M29.9424 18.1258L12.6292 0.818243C11.8695 0.060469 10.6386 0.0604688 9.87702 0.818243C9.11733 1.57602 9.11733 2.80685 9.87702 3.56462L25.817 19.4989L9.87894 35.4331C9.11925 36.1909 9.11925 37.4217 9.87894 38.1814C10.6386 38.9392 11.8714 38.9392 12.6311 38.1814L29.9443 20.8741C30.6924 20.1241 30.6924 18.8739 29.9424 18.1258Z" fill="white"></path>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_163_415">
                                    <rect width="38.5" height="38.5" fill="white" transform="translate(39.1562 38.75) rotate(-180)"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </Link>
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
            </div>
        } />
    )
}
