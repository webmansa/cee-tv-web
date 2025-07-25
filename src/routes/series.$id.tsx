import { createFileRoute, Link } from '@tanstack/react-router'
import { MovieCardSkeleton } from 'src/components/MovieCardSkeleton'
import { SocialActions } from 'src/components/SocialActions/SocialActions'
import { PageLayout } from 'src/layouts/PageLayout/PageLayout'
import { useCreateFavoriteWatchList } from 'src/services/mutations/useCreateFavoriteWatchList'
import { useGetAllFavoriteSeries } from 'src/services/queries/useGetAllFavoriteSeries'
import { useGetSeriesDetails } from 'src/services/queries/useGetSeriesDetails'
import { dateConverter } from 'src/utils/dateConverter'
import { getImdbImageUrl } from 'src/utils/getImdbImageUrl'

export const Route = createFileRoute('/series/$id')({
    loader: ({ params: { id } }) => id,
    component: SeriesDetails,
})

function SeriesDetails() {
    const seriesId = Route.useLoaderData()

    const { data, isLoading } = useGetSeriesDetails(seriesId)
    const { data: favoriteSeries, refetch } = useGetAllFavoriteSeries()

    const { isFavorite } = favoriteSeries?.find(({ movieID }) => movieID === seriesId) || {}

    const { mutate: createWatchList } = useCreateFavoriteWatchList()


    return (
        <PageLayout content={
            <>
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
                    isLoading ? <MovieCardSkeleton /> : <div>
                        {data?.poster_path && <img src={getImdbImageUrl(data?.poster_path || '', 'w400') || ''} alt={data?.name} />} 
                    </div>
                }

                <div className="p-4 relative" style={{ background: '#FAF8F5' }}>
                    <SocialActions isFavorite={Boolean(isFavorite)} onClick={() => {
                        createWatchList({
                            id: seriesId,
                            title: data?.name || '',
                            showType: 'serie',
                            isFavorite: !isFavorite,
                            image: getImdbImageUrl(data?.poster_path || '', 'w400') || '',
                            year: data?.first_air_date ? dateConverter(data?.first_air_date) : '',

                        })
                    }} />

                    <div className="flex gap-2">
                        <span className="font-bold">ratings: <em style={{ color: '#005082' }}>{data?.vote_average ? data.vote_average : 'N/A'}</em></span>
                        <span className="font-bold">status: <em className="text-sm" style={{ color: '#005082' }}>{data?.status}</em> </span>
                    </div>

                    <h3 className="font-bold mt-3 text-lg">{data?.name}</h3>

                    <p className="font-light">{data?.overview}</p>

                    <div className="grid grid-cols-2 items-center mt-4">
                        <div className="font-bold">Genre:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>{data?.genres.map(({ name }) => name).join(', ')}</span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className="font-bold">Year:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>
                            {data?.first_air_date ? new Date(data.first_air_date).toLocaleDateString() : 'N/A'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className="font-bold">Production:</div>
                        <span className="gen font-medium text-sm text-ellipsis inline-flex" style={{ color: '#005082' }}>{data?.production_companies.map(({ name }) => name).join(', ')}</span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className='font-bold'>Runtime:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>{data?.episode_run_time} mins</span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className="font-bold">Origin Language:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>{data?.spoken_languages[0].english_name}</span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className="font-bold">No: of episodes:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>{data?.number_of_episodes}</span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className="font-bold">No: of seasons:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>{data?.number_of_seasons}</span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className="font-bold">Last air date:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>{data?.last_air_date ? new Date(data.last_air_date).toLocaleDateString() : 'N/A'}</span>
                    </div>

                    <div className="grid grid-cols-2 items-center">
                        <div className="font-bold">Network:</div>
                        <span className="gen font-medium text-sm" style={{ color: '#005082' }}>{data?.networks.map(({ name }) => name).join(', ')}</span>
                    </div>
                </div>
            </>
        } />
    )
}
