import React from 'react'
import { Title } from '../Title/Title';

export const Container = ({ children, text }: { children: React.ReactNode; text: string }) => {
    return (
        <>
            <Title text={text} style={{ color: '#FAF8F5' }} />
            <div className="flex flex-row gap-3 overflow-x-scroll mb-8">
                {children}
            </div>
        </>
    )
}