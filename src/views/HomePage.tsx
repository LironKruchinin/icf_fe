import React from 'react'
import { Boxes } from '../interface/HomePage'
import icf4 from '../assets/images/icf4.gif'
type Props = {}

const HomePage = (props: Props) => {
    const boxInfo = () => {
        const boxes: Boxes[] = [
            {
                imageLink: 'https://placehold.co/300x20',
                boxText: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Veritatis, molestias impedit dolore quia provident quibusdam velit veniam ab nulla saepe ipsum alias,
                    in deserunt debitis officiis nisi, sapiente iure at?`,
                buttonText: 'Test'
            },
            {
                imageLink: 'https://placehold.co/300x20',
                boxText: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Veritatis, molestias impedit dolore quia provident quibusdam velit veniam ab nulla saepe ipsum alias,
                    in deserunt debitis officiis nisi, sapiente iure at?`,
                buttonText: 'Test'
            },
            {
                imageLink: 'https://placehold.co/300x20',
                boxText: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Veritatis, molestias impedit dolore quia provident quibusdam velit veniam ab nulla saepe ipsum alias,
                    in deserunt debitis officiis nisi, sapiente iure at?`,
                buttonText: 'Test'
            },
            {
                imageLink: icf4,
                boxText: `Lorem ipsum dolor sit, amet consectetur adipisicing elit.`,
                buttonText: 'Continue',
                isBlackFont: true,
                boxStyle: { color: 'white', borderRadius: '20px', overflow: 'hidden' }
            },
        ]

        const mainScreenBoxes = boxes.map((box, index) => {
            return (
                <div className={'box' + ' pos' + index + (box.isBlackFont ? ' black-mode' : ' light-mode')} key={index} style={box.boxStyle}>
                    <div className="image-container">
                        <img src={box.imageLink} alt={box.imageAlt} />
                    </div>
                    <div className='data-box'>
                        {box.boxText}
                        <button>{box.buttonText}</button>
                    </div>
                </div>
            )
        })

        return mainScreenBoxes
    }

    return (
        <main>
            <div className='intro'>

                {boxInfo()}

            </div>
        </main>
    )
}

export default HomePage