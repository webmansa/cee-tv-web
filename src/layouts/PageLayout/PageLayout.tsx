import React from 'react'

export const PageLayout = ({ content }: { content: React.ReactNode}) => {
    return (
        <div className='max-w-[400px] m-auto p-4 mt-5 rounded-lg' style={{ backgroundColor: '#1e2129'}}>
            { content }
        </div>
    )
}