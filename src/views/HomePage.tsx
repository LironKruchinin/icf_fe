import React, { useEffect, useState } from 'react'
import { Boxes } from '../interface/HomePage'
import icf4 from '../assets/images/icf4.gif'
import DOMPurify from 'dompurify';
import { getLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

type Props = {}

const HomePage = (props: Props) => {
    const navigate = useNavigate()

    const boxInfo = () => {
        const boxes: Boxes[] = [
            {
                imageLink: 'https://placehold.co/300x20',
                boxText:
                    `<h1>hello</h1>`,
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
                boxText: `Sign up now`,
                buttonText: 'Sign Up',
                isBlackFont: true,
                buttonLink: '/register',
                boxStyle: { color: 'white', borderRadius: '20px', overflow: 'hidden' }
            },
        ]

        const sanitizeHTML = (html: string) => {
            return { __html: DOMPurify.sanitize(html) }; // Sanitize the HTML using DOMPurify
        };

        const mainScreenBoxes = boxes.map((box, index) => {
            const renderContent = () => {
                return <div dangerouslySetInnerHTML={sanitizeHTML(box.boxText)} />;
            };

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
            );
        });

        return mainScreenBoxes;
    };

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: 80, left: 0, right: 0, bottom: 0 }}>
            <div className='intro'>
                {boxInfo()}
            </div>
        </motion.main>
    );
};

export default HomePage;