import { Link } from '@tanstack/react-router';
import React from 'react'
import { dateConverter } from 'src/utils/dateConverter';
import { getImdbImageUrl } from 'src/utils/getImdbImageUrl';
import { Title } from '../Title/Title';
import classNames from 'classnames';
import { SearchQuery } from 'src/types/searchQuery.types';

interface HeaderProps {
  handleSearchQuery: (e: React.FormEvent<HTMLFormElement>) => void
  searchTerm: string
  isLoading: boolean
  data: SearchQuery | undefined
}

export const Header: React.FC<HeaderProps> = ( {handleSearchQuery, searchTerm, isLoading, data }) => {
  return (
    <header className="h-32 p-4" style={{ background: '#F54632' }}>
      <div className="flex">
        {/* <span><img src="/src/images/ceetv.png" /></span> */}
        <Title text="Discover" style={{ color: '#FAF8F5' }} />
      </div>

      <form
        id="form"
        className="relative"
        onSubmit={handleSearchQuery}
      >
        <>
          <div className='flex w-full justify-between items-center relative'>
            <input
              name="searchTerm"
              type="search"
              className={classNames('bg-neutral-100 p-2 flex w-full pl-4 h-12', {
                'rounded-bl-none rounded-br-none rounded-tr-lg rounded-tl-lg': searchTerm,
                'rounded-2xl': !searchTerm
              })}
              placeholder="Search your favorite movies or series"
            />

            {isLoading && (
              <span className="absolute right-4 top-2.5">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="30px"
                  height="30px"
                  viewBox="0 0 100 100"
                  enableBackground="new 0 0 100 100"
                  xmlSpace="preserve"
                  fill="#000000"
                  style={{ animation: 'spin 1s linear infinite' }}
                >
                  <style>
                    {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
                  </style>
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g id="Spinner_x5F_75_x25_">
                      <g>
                        <path
                          fill="none"
                          stroke="#F54632"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          d=" M50.915,26.824C63.385,27.208,73.375,37.437,73.375,50c0,12.806-10.381,23.188-23.188,23.188c-11.303,0-20.717-8.087-22.771-18.79 c-0.154-0.804-0.262-1.566-0.331-2.397"
                        ></path>
                        <g>
                          <ellipse
                            transform="matrix(0.9962 -0.0867 0.0867 0.9962 -3.713 2.567)"
                            cx="27.71"
                            cy="44.049"
                            rx="1.959"
                            ry="1.959"
                          ></ellipse>
                          <ellipse
                            transform="matrix(0.9962 -0.0867 0.0867 0.9962 -3.079 2.8158)"
                            cx="30.892"
                            cy="36.872"
                            rx="1.959"
                            ry="1.959"
                          ></ellipse>
                          <ellipse
                            transform="matrix(0.9962 -0.0867 0.0867 0.9962 -2.567 3.266)"
                            cx="36.334"
                            cy="31.199"
                            rx="1.959"
                            ry="1.959"
                          ></ellipse>
                          <ellipse
                            transform="matrix(0.9962 -0.0867 0.0867 0.9962 -2.2318 3.8617)"
                            cx="43.363"
                            cy="27.636"
                            rx="1.959"
                            ry="1.959"
                          ></ellipse>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            )}
          </div>

          {
            searchTerm && (<div className="shadow absolute w-full h-[400px] z-50 overflow-y-scroll bg-white rounded-bl-lg rounded-br-lg" data-testid="auto-complete">
              {
                data && data.results.length ? data.results.map(({ title, name, release_date, poster_path, overview, first_air_date, media_type, id }) => {
                  const filmType = media_type === 'movie' ? '/movie/$id' : '/series/$id'
                  return (
                    <Link to={filmType} params={{ id: String(id) }} key={id} className="flex gap-2 p-2 hover:bg-neutral-200 border-b">
                      {
                        poster_path && <figure className="w-[40px] h-[60px] flex-shrink-0">
                          <img src={getImdbImageUrl(poster_path, 'w200') || ''} alt={title} className="h-full rounded object-contain" />
                        </figure>
                      }
                      <div className="flex flex-col gap-1 grow">
                        <h4 className="font-semibold text-sm">{title || name}</h4>
                        <p className="text-xs text-gray-500">{overview}</p>
                        {release_date && <p className="text-xs text-gray-500 font-medium">{dateConverter(release_date)}</p>}
                        {!release_date && first_air_date && <p className="text-xs text-gray-500 font-medium">{dateConverter(first_air_date)}</p>}
                      </div>
                    </Link>
                  )
                }) : <div className="p-4">no results found....</div>
              }
            </div>)
          }
        </>
      </form>
    </header>
  )
}
