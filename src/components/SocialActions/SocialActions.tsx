import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'


interface SocialActionsProps {
  onClick: React.MouseEventHandler<HTMLDivElement>
  isFavorite: boolean,
}

export const SocialActions: React.FC<SocialActionsProps> = ({ onClick, isFavorite }) => {
  console.log(isFavorite, 'sdsdds')
  return ( //  text-[${isFavorite ? '#F54632' : '#005082'}]
    <div
      className="mb-3 flex absolute right-4 cursor-pointer"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faBookmark} className={`${classNames('fa-regular text-2xl transition-all', {
        'text-[#F54632]': isFavorite,
        'text-[#005082]': !isFavorite
      })}`} title="add to watchlist" titleId="watchlist-icon" />
    </div>
  )
}

