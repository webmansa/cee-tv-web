import { Title } from "../Title/Title";

export const MovieCard = ({ imgUrl, title, year }: { imgUrl: string; title: string;  year: string}) => {
    return (
        <article className="mt-8">
         <Title text="Latest Movies" style={{ color: '#FAF8F5'}} />
         
            <figure>
                <img
                    src={imgUrl}
                    alt={title} />
                <figcaption>{title}</figcaption>
            </figure>
        </article>
    )
}