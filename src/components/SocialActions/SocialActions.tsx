import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'


interface SocialActionsProps {
    handleWatchlist?: () => void
}

export const SocialActions: React.FC<SocialActionsProps> = ({ handleWatchlist }) => {
  return (
        <div className="mb-3 flex absolute right-4 cursor-pointer">
          <FontAwesomeIcon icon={faBookmark} className="text-2xl text-[#F54632] hover:text-[#005082] transition-all" title='add to watchlist'/>
        </div>
    )
}
