import React, { useEffect, useState } from 'react'
import { Header } from 'src/components/Header/Header'
import { useGetSearchQuery } from 'src/services/useGetSearchQuery'

export const PageLayout = ({ content }: { content: React.ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState<string>('')

    const { data, isLoading, refetch } = useGetSearchQuery(searchTerm || '')

    console.log(data, 'search query data...')

    console.log(searchTerm, 'searchTerm')

    const handleSearchQuery = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get('searchTerm');

        setSearchTerm(searchTerm as string)
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                refetch()
            }
        }, 400)

        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    return (
        <div className="m-auto w-[400px]">
            <Header handleSearchQuery={handleSearchQuery} isLoading={isLoading} data={data} searchTerm={searchTerm} />

            <div className='p-4' style={{ backgroundColor: '#1e2129' }}>
                {content}
            </div>
        </div>
    )
}