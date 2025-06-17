import { Link } from '@tanstack/react-router'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Title } from 'src/components/Title/Title'
import { useGetSearchQuery } from 'src/services/useGetSearchQuery'
import { dateConverter } from 'src/utils/dateConverter'
import { getImdbImageUrl } from 'src/utils/getImdbImageUrl'

export const PageLayout = ({ content }: { content: React.ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null)

    const { data, isLoading } = useGetSearchQuery(searchTerm || '')

    console.log(data, 'search query data...')

    return (
        <div className="m-auto w-[400px]">
          
            <header className="h-32 p-4" style={{ background: '#F54632' }}>
                <Title text="Discover" style={{ color: '#FAF8F5' }} />

                <form
                    id="form"
                    className="relative"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const searchTerm = formData.get('searchTerm');

                        setSearchTerm(searchTerm as string)
                    }}
                >
                    <div className='flex w-full justify-between'>
                        <input
                            name="searchTerm"
                            type="search"
                            className={classNames('bg-neutral-100 p-2 flex w-full pl-4 h-12', {
                                'rounded-bl-none rounded-br-none rounded-tr-lg rounded-tl-lg': data?.results.length,
                                'rounded-2xl': !data?.results.length
                            })}
                            placeholder="Search your favorite movies or series"
                        />
                    </div>

                    {searchTerm && data?.results && data.results.length > 0 && (
                        <div className="shadow absolute w-full h-[500px] z-50 overflow-y-scroll bg-white">
                            {
                                isLoading ? <div>isLoading.....</div> : (data && data.results.length && data.results.map(({ title, release_date, poster_path, overview, id }) => (
                                    <Link to='/series/$id' params={{ id: String(id) }} key={id} className="flex gap-2 p-2 hover:bg-neutral-200 border-b">
                                        {
                                            poster_path && <figure className="w-[40px] h-[60px] flex-shrink-0">
                                                <img src={getImdbImageUrl(poster_path, 'w200') || ''} alt={title} className="h-full rounded object-contain" />
                                            </figure>
                                        }
                                        <div className="flex flex-col gap-1 grow">
                                            <h4 className="font-semibold text-sm">{title}</h4>
                                            <p className="text-xs text-gray-500">{overview}</p>
                                            {release_date && <p className="text-xs text-gray-500 font-medium">{dateConverter(release_date)}</p>}
                                        </div>
                                    </Link>
                                )))
                            }
                        </div>
                    )}
                </form>
            </header>
                        
            <div className='p-4' style={{ backgroundColor: '#1e2129' }}>
                {content}
            </div>
        </div>
    )
}