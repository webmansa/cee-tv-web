import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import { Container } from 'src/components/Container'
import { MovieCard } from 'src/components/MovieCard/MovieCard'
import { MovieCardSkeleton } from 'src/components/MovieCardSkeleton'
import { Slider } from 'src/components/Slider/Slider'
import { SliderSkeleton } from 'src/components/SliderSkeleton'
import { Title } from 'src/components/Title/Title'
import { PageLayout } from 'src/layouts/PageLayout'
import { useGetMovies } from 'src/services/queries/useGetMovies'
import { useGetRecommendations } from 'src/services/queries/useGetRecommendations'
import { useGetSeries } from 'src/services/queries/useGetSeries'
import { useGetUpcoming } from 'src/services/queries/useGetUpcoming'
import { UpcomingMovieResult } from 'src/types/upcomingMovie.types'
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

export interface IMovie {
    id: number
    title: string
    poster_path: string
    release_date: string
    name?: string
}

function Home() {
    const { data: movies, isLoading: isMoviesLoading } = useGetMovies()
    const { data: series, isLoading: isSeriesLoading } = useGetSeries()
    const { data: upcoming, isLoading: isUpComingLoading } = useGetUpcoming()



    const latestMovies: Array<{ title: string; year: string; imgUrl: string; id: string }> = movies?.results?.map(({ title, release_date, poster_path, id }: IMovie) => ({ title, year: release_date, imgUrl: getImdbImageUrl(poster_path, 'w200'), id }))

    const lastestSeries: Array<{ title: string; year: string; imgUrl: string; id: string }> = series?.results?.map(({ title, release_date, poster_path, name, id }: IMovie) => ({ title: title || name, year: release_date, imgUrl: getImdbImageUrl(poster_path, 'w200'), id }))

    const upcomingMovies: Array<{ title: string; year: string; imgUrl: string | null; id: string | number }> = upcoming?.results?.map(
        ({ title, release_date, poster_path, id }: UpcomingMovieResult) => ({
            title: title,
            year: typeof release_date === 'string' ? release_date : new Date(release_date).toLocaleDateString(),
            imgUrl: getImdbImageUrl(poster_path, 'w200'),
            id: id
        })
    ) ?? []

    console.log(upcoming, 'upcoming show')

    return (
        <PageLayout
            content={
            <>
                <Container text="Latest Movies">
                        {isMoviesLoading ? <MovieCardSkeleton /> :

                        latestMovies && latestMovies.map(({ title, year, imgUrl, id }) => (
                            <Link to='/movie/$id' params={{ id }}>
                                <MovieCard title={title} imgUrl={imgUrl} year={year} />
                            </Link>
                        ))
                    }
                </Container>

                <Container text="Latest Series">
                    { isSeriesLoading ? <MovieCardSkeleton /> :

                        lastestSeries && lastestSeries.map(({ title, year, imgUrl, id }) => (<Link to='/series/$id' params={{ id }}><MovieCard title={title} imgUrl={imgUrl} year={year} /></Link>))
                    }
                    </Container>
                    
                <Container text="Upcoming Movies">
                    { isUpComingLoading ? <MovieCardSkeleton /> :

                        upcomingMovies.length && upcomingMovies.map(({ title, year, imgUrl, id }) => (<Link to='/movie/$id' params={{ id: id.toString() }}><MovieCard title={title} imgUrl={imgUrl || ''} year={year} /></Link>))
                    }
                </Container>
            </>
        } />
    )
}
