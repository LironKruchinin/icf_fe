import React from 'react'

interface ExplenationProps {
    paragraphTitle?: string
    paragraphText: string
}

const ClanExplenation: React.FC<ExplenationProps> = ({ paragraphTitle, paragraphText }) => {
    return (
        <div className='explenation'>
            <h2>{paragraphTitle}</h2>
            <p>{paragraphText}</p>
        </div>
    )
}

export default ClanExplenation