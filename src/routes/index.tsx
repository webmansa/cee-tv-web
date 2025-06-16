import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import { Container } from 'src/components/Container'
import { MovieCard } from 'src/components/MovieCard/MovieCard'
import { Slider } from 'src/components/Slider/Slider'
import { Title } from 'src/components/Title/Title'
import { PageLayout } from 'src/layouts/PageLayout'
import { useGetMovies } from 'src/services/useGetMovies'
import { useGetRecommendations } from 'src/services/useGetRecommendations'
import { useGetSeries } from 'src/services/useGetSeries'
import { getImdbImageUrl } from 'src/utils/getImdbImageUrl'

const filePath = 'count.txt'

async function readCount() {
    return parseInt(
        await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
    )
}

const getCount = createServerFn({
    method: 'GET',
}).handler(() => {
    return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
    .validator((d: number) => d)
    .handler(async ({ data }) => {
        const count = await readCount()
        await fs.promises.writeFile(filePath, `${count + data}`)
    })

export const Route = createFileRoute('/')({
    component: Home,
    loader: async () => await getCount(),
})

type Movie = { poster_path: string; title: string }

interface IMovie {
    id: string
    title: string
    poster_path: string
    release_date: string
    name?: string
}

function Home() {
    const router = useRouter()
    const state = Route.useLoaderData()

    const { data: recommendations, isLoading: isRecommendationsLoading } = useGetRecommendations()
    const { data: movies, isLoading: isMoviesLoading } = useGetMovies()
    const { data: series, isLoading: isSeriesLoading } = useGetSeries()


    const moviePosters = recommendations?.results.slice(0, 10).map(
        ({ poster_path, title }: Movie) => ({ item: getImdbImageUrl(poster_path, 'w400'), title })
    )

    const latestMovies: Array<{ title: string; year: string; imgUrl: string; id: string }> = movies?.results?.map(({ title, release_date, poster_path, id }: IMovie) => ({ title, year: release_date, imgUrl: getImdbImageUrl(poster_path, 'w200'), id }))

    const lastestSeries: Array<{ title: string; year: string; imgUrl: string }> = series?.results?.map(({ title, release_date, poster_path, name }: IMovie) => ({ title: title || name, year: release_date, imgUrl: getImdbImageUrl(poster_path, 'w200')  }))

    // console.log(series, 'series')
    console.log(movies, 'movies')
    // const components = ['gallery, recommended, latest movies, series,']

    return (
        <PageLayout
            content={
            <>
                <Title text="Trending" style={{ color: '#FAF8F5' }} />
                
                <div className="mb-8">
                    {moviePosters && <Slider galleries={moviePosters} />}
                </div>

                <Container text="Latest Movies">
                    {

                        latestMovies && latestMovies.map(({ title, year, imgUrl, id }) => (
                            <Link to={`/movie/$id`} params={{ id }}>
                                <MovieCard title={title} imgUrl={imgUrl} year={year} />
                            </Link>
                        ))
                    }
                </Container>

                <Container text="Latest Series">
                    {

                        lastestSeries && lastestSeries.map(({ title, year, imgUrl }) => (<MovieCard title={title} imgUrl={imgUrl} year={year} />))
                    }
                </Container>
            </>
        } />
    )
}
