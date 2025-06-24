import React from 'react'

export const MovieCardSkeleton = () => {
    return (
        <div className="overflow-hidden shadow bg-white animate-pulse w-full">
            <div className="h-75 bg-gray-200" />
            <div className="p-3">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
        </div>
    )
}