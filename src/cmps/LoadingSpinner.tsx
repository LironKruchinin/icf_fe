import React from 'react'

type Props = {}

const LoadingSpinner = (props: Props) => {
    return (
        <div className="overlay">
            <div className="spinner"></div>
        </div>
    )
}

export default LoadingSpinner