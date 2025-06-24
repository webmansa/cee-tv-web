import React from 'react'

export const SliderSkeleton = () => {
    return (
        <div className="flex py-2">
            <div
                className="w-[368px] h-[550px] bg-gray-200 animate-pulse flex-shrink-0"
            />
        </div>
    )
}