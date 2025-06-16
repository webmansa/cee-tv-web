import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import * as fs from 'node:fs'
import { MovieCard } from 'src/components/MovieCard/MovieCard'
import { Slider } from 'src/components/Slider/Slider'
import { Title } from 'src/components/Title/Title'
import { PageLayout } from 'src/layouts/PageLayout'
import { useGetRecommendations } from 'src/services/useGetRecommendations'
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

function Home() {
    // const apiUrl = import.meta.env.VITE_API_URL;
    const router = useRouter()
    const state = Route.useLoaderData()

    const { data, isLoading } = useGetRecommendations()

    if (isLoading) {
        return null
    }

    type Movie = { poster_path: string; title: string }
    const moviePosters = data.results.slice(0, 10).map(
        ({ poster_path, title }: Movie) => ({ item: getImdbImageUrl(poster_path, 'w400'), title })
    )

    console.dir(data, 'this is the data gotten from the tmdb api interface...')
    
    const components = ['gallery, recommended, latest movies, series,']

    return (
        <PageLayout content={
            <>
                {/* <button
                    type="button"
                    onClick={() => {
                        updateCount({ data: 1 }).then(() => {
                            router.invalidate()
                        })
                    }}
                >
                    Add 1 to {state}?
                </button> */}

                <div className="h-32 mb-8 p-4" style={{ border: '1px solid red', background: '#F54632' }}>
                    <Title text="Discover" style={{ color: '#FAF8F5'}} />

                    <form action="">
                        <div className='flex w-full justify-between'>
                            <input type="search" className='bg-neutral-100 rounded-2xl p-2 flex w-full' placeholder="Search your favorite movies or series" />
                        </div>
                    </form>
                </div>

                <Slider galleries={moviePosters} />

                <MovieCard title='Movie' imgUrl='https://image.tmdb.org/t/p/w400/A89x10Eqt43bPFEWPpbraWwkaFr.jpg' year='2025' />
            </>
        } />
    )
}

