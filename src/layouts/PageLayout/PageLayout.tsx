import React from 'react'
import { Title } from 'src/components/Title/Title'

export const PageLayout = ({ content, header }: { content: React.ReactNode, header?: React.ReactNode}) => {
    return (
        <div className="max-w-[400px] m-auto ">
          
            <header className="h-32 p-4" style={{ border: '1px solid red', background: '#F54632' }}>
                <Title text="Discover" style={{ color: '#FAF8F5' }} />

                <form action="">
                    <div className='flex w-full justify-between'>
                        <input type="search" className='bg-neutral-100 rounded-2xl p-2 flex w-full' placeholder="Search your favorite movies or series" />
                    </div>
                </form>
            </header>
                        
            <div className='p-4' style={{ backgroundColor: '#1e2129' }}>
                {content}
            </div>
        </div>
    )
}