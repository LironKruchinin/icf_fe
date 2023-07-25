import React, { useEffect, useState } from 'react'
import { Boxes } from '../interface/HomePage'
import icf1 from '../assets/images/icf1.jpg'
import icf2 from '../assets/images/icf2.jpg'
import icf3 from '../assets/images/icf3.jpg'
import icf4 from '../assets/images/icf4.gif'
import icf5 from '../assets/images/icf5.png'
import DOMPurify from 'dompurify';
import { getLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import ClanExplenation from '../cmps/ClanExplenation'

type Props = {}

const HomePage = (props: Props) => {
    const navigate = useNavigate()

    const boxInfo = () => {
        const boxes: Boxes[] = [
            {
                imageLink: icf1,
                boxText: `
                <h2>Join Our Thriving Community Today!</h2>
                <span>Connect, Engage, and Explore with Like-minded Individuals</span>
                `,
                buttonText: 'Sign Up',
                buttonLink: '/register',
            },
            {
                imageLink: icf5,
                boxText: `
                <h2>Upcoming Events</h2>
                <span>Stay in the loop with our exciting events!</span>
                `,
                buttonText: 'Explore Events',
                isBlackFont: true,
            },
            {
                imageLink: icf2, // Make a grid of last 4 events
                boxText: `
                <h2>Meet Our Members</h2>
                <span>Spotlighting the Extraordinary Individuals Within Our Ranks</span>
                `,
                buttonText: 'Learn More',
                buttonLink: '/about',
                isBlackFont: true,

            },
            {
                imageLink: icf4,
                boxText: ` 
                <h2>Support Our Community: Donate and Make a Difference</h2>
                <span>Empower the Community You Love</span>
                `,
                buttonText: 'Help Us Grow',
                isBlackFont: true,
            },
        ]

        const sanitizeHTML = (html: string) => {
            return { __html: DOMPurify.sanitize(html) }; // Sanitize the HTML using DOMPurify
        }

        const mainScreenBoxes = boxes.map((box, index) => {
            const renderContent = () => {
                return <div dangerouslySetInnerHTML={sanitizeHTML(box.boxText)} />;
            }

            return (
                <div className={'box' + ' pos' + index + (box.isBlackFont ? ' dark-mode' : ' light-mode')} key={index} style={box.boxStyle}>
                    <div className="image-container">
                        <img src={box.imageLink} alt={box.imageAlt} />
                    </div>
                    <div className='data-box'>
                        {renderContent()}
                        <button onClick={() => box.buttonLink ? navigate(box.buttonLink) : navigate('/')}>{box.buttonText}</button>
                    </div>
                </div>
            )
        })

        return mainScreenBoxes
    };

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: 80, left: 0, right: 0, bottom: 0 }}>
            <div className='intro'>
                {boxInfo()}
            </div>

            <div className='description'>
                <ClanExplenation />
                {/* We are a clan that focuses on realism while trying to gain experiences vibe and to make fun at the same time.
                We are a unit that always wants to develop ourself and we welcome most players with open arms and believe that we can bring everyone to a high level of control in the game.
                The unit simulates the diverse capabilities within the IDF and maintains a very high level of professionalism while performing various tasks and training. Our unit has real operators who in their daily lives are engaged in the fields of warfare in the IDF and gives thier point of view and diversity to the tasks from their personal experience during their time as fighters.
                In our clan, we emphasize an immersive experience that gives the sense of reality in battle and lets the player enter a combative character whether in communication or in actions. */}
            </div>
        </motion.main>
    )
}

export default HomePage;