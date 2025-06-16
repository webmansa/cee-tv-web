import { createFileRoute } from '@tanstack/react-router'
import { PageLayout } from 'src/layouts/PageLayout/PageLayout'
import { useGetSeriesDetails } from 'src/services/useGetSeriesDetails'
import { getImdbImageUrl } from 'src/utils/getImdbImageUrl'

export const Route = createFileRoute('/series/$id')({
  loader: ({ params: { id } }) => id,
  component: SeriesDetails,
})

function SeriesDetails() {
    const seriesId = Route.useLoaderData()
    const { data, isLoading } = useGetSeriesDetails(seriesId)

    console.log(data, 'seriesId')

  return  (
          <PageLayout content={
              <>
                  {
                      isLoading ? <div> is loading...</div> : <div>
                          <img src={getImdbImageUrl(data?.poster_path || '', 'w400') || ''} alt={data?.name} />
                      </div>
                  }
                  
                  <div className="p-4 relative" style={{ background: '#FAF8F5' }}>
                      
                      <div className="mb-3 flex absolute right-4">
                          <img src="/src/images/icons/favorite.svg" className="w-[30px]" />
                      </div>
                      <div className="flex gap-2">
                      <span className="font-bold">ratings: <em style={{ color: '#005082' }}>{data?.vote_average ? data.vote_average : 'N/A'}</em></span>
                          <span className="font-bold">status: <em className="text-sm" style={{ color: '#005082' }}>{data?.status}</em> </span>
                      </div>
  
                      <h3 className="font-bold mt-3 text-lg">{data?.name}</h3>
  
                      <p className="font-light">{data?.overview}</p>
  
                      <div className="grid grid-cols-2 items-center mt-4">
                          <div className="font-bold">Genre:</div>
                          <span className="gen font-medium text-sm" style={{ color: '#005082' }}>{data?.genres.map(({ name}) => name).join(', ')}</span>
                      </div>
  
                      <div className="grid grid-cols-2 items-center">
                          <div className="font-bold">Year:</div>
                          <span className="gen font-medium text-sm" style={{ color: '#005082' }}>
                              {data?.first_air_date ? new Date(data.first_air_date).toLocaleDateString() : 'N/A'}
                          </span>
                      </div>
  
                      <div className="grid grid-cols-2 items-center">
                          <div className="font-bold">Production:</div>
                          <span className="gen font-medium text-sm text-ellipsis inline-flex" style={{ color: '#005082' }}>{data?.production_companies.map(({ name}) => name).join(', ')}</span>
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
