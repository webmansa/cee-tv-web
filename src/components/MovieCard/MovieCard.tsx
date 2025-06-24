import { dateConverter } from "src/utils/dateConverter";

export const MovieCard = ({ imgUrl, title, year }: { imgUrl: string; title: string;  year: string}) => {
    return (
        <article className="cursor-pointer">
            <figure className="w-[200px]">
                <img
                    className="min-h-[300px]"
                    src={imgUrl}
                    alt={title} />
                <figcaption className="h-[30px] px-1.5 flex items-center text-sm mt-3 justify-center" style={{ background: '#FAF8F5' }}>{title}</figcaption>
                {year && <span className="h-[30px] flex justify-center" style={{ background: '#F54632' }}>{dateConverter(year)}</span>}
            </figure>
        </article>
    )
}