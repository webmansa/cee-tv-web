
export const MovieCard = ({ imgUrl, title, year }: { imgUrl: string; title: string;  year: string}) => {
    return (
        <article className="cursor-pointer">
            <figure className="w-[200px]">
                <img
                    src={imgUrl}
                    alt={title} />
                <figcaption className="rounded-[50px] px-1.5 flex items-center text-sm mt-3 h-[20px] justify-center" style={{ background: '#FAF8F5' }}>{title}</figcaption>
            </figure>
        </article>
    )
}