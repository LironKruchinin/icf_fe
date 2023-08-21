import React from 'react'
import mapImg from '../assets/images/background.jpg'
type Props = {}

const SideDisplay = (props: Props) => {
    return (
        <>
            <div className="image-container">
                <img src={mapImg} alt="" />
            </div>
        </>
    )
}

export default SideDisplay