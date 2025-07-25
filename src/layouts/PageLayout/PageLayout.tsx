import { Link } from '@tanstack/react-router'
import React, { useEffect, useState } from 'react'
import { Header } from 'src/components/Header/Header'
import { useGetSearchQuery } from 'src/services/queries/useGetSearchQuery'

export const PageLayout = ({ content }: { content: React.ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState<string>('')

    const { data, isLoading, refetch } = useGetSearchQuery(searchTerm || '')

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
        <div className="m-auto w-full">
            <Header handleSearchQuery={handleSearchQuery} isLoading={isLoading} data={data} searchTerm={searchTerm} />

            <div className='p-4 relative' style={{ backgroundColor: '#1e2129' }}>
                {content}
            </div>
            <nav className='h-10 text-white flex gap-2 items-center px-4 transition-all fixed bottom-0 w-full' style={{ background: 'rgb(245, 70, 50)' }}>
                <Link to="/" title='Home' style={{ color: 'rgb(250, 248, 245)' }} className='p-1 px-2 rounded-sm'>/Home</Link>
                <Link to="/favorites" title='Favorites' style={{ color: 'rgb(250, 248, 245)' }} className='p-1 px-2 rounded-sm'>/Favorites</Link>
            </nav>
        </div>
    )
}