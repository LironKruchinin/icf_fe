import DOMPurify from 'dompurify'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import icf1 from '../assets/images/icf1.jpg'
import icf2 from '../assets/images/icf2.jpg'
import icf4 from '../assets/images/icf4.gif'
import icf5 from '../assets/images/icf5.png'
import ClanExplenation from '../cmps/ClanExplenation'
import ImageSlider from '../cmps/ImageSlider'
import ScrollMore from '../cmps/ScrollMore'
import { Boxes } from '../interface/HomePage'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { loginUser } from '../features/profileSlice'

const HomePage = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const screenState = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        document.title = 'ICF Home page';
        const token = Cookies.get('accessToken')

        if (token) dispatch(loginUser)

        return () => { }
    }, [document.cookie])

    const shortText = `We are a realism-focused clan that values experiences and fun.
    With real IDF operators, we simulate diverse capabilities and maintain high professionalism.
    Join us for an immersive and engaging combat experience.`

    const explenationTitle = `Embrace Realism, Unleash Fun: Join Our IDF-Inspired Clan!`

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
                isBlackFont: true,
            },
            {
                imageLink: icf5,
                boxText: `
                <h2>Upcoming Events</h2>
                <span>Stay in the loop with our exciting events!</span>
                `,
                buttonText: 'Explore Events',
                buttonLink: '/mission',
                // isBlackFont: true,
            },
            {
                imageLink: icf2,
                boxText: `
                <h2>Meet Our Members</h2>
                <span>Spotlighting the Extraordinary Individuals Within Our Ranks</span>
                `,
                buttonText: 'Learn More',
                buttonLink: '/about',
                // isBlackFont: true,
            },
            {
                imageLink: icf4,
                boxText: ` 
                <h2>Support Our Community: Donate and Make a Difference</h2>
                <span>Empower the Community You Love</span>
                `,
                buttonText: 'Help Us Grow',
                buttonLink: '/support',
                // isBlackFont: true,
            },
        ]

        const sanitizeHTML = (html: string) => {
            return { __html: DOMPurify.sanitize(html) }
        }

        const mainScreenBoxes = boxes.map((box, index) => {
            const userData = screenState?.data
            const userRoles = userData?.roles

            const renderContent = () => {
                if (userData) {

                    if (box.buttonText === 'Sign Up') {
                        if (userRoles?.length === 1) {
                            box.boxText = `
                            <h2>Join now!</h2>
                            <span>Connect, Engage, and Explore with Like-minded Individuals</span>
                            `
                            box.buttonText = 'Submit an application'
                            box.buttonLink = '/application'
                        } else {
                            if (screenState.isAdmin) {
                                box.boxText = `
                                    <h2>Dashboard Overview</h2>
                                    <span>Provide a brief overview of the website's current status, such as the number of active members,
                                    recent activities, and upcoming events.</span>
                                    `
                                box.buttonText = 'View Analytics'
                                box.buttonLink = '/admin-panel'
                            }
                        }
                    }

                    if (box.buttonText === 'Explore Events') {
                        if (userRoles?.length !== 1) {
                            if (screenState.isAdmin) {
                                box.boxText = `
                                    <h2>Event Management!</h2>
                                    <span>Connect, Engage, and Explore with Like-minded Individuals</span>
                                    `
                                box.buttonText = 'Create Events'
                                box.buttonLink = '/mission'
                            }
                        }
                    }
                    if (box.buttonText === 'Help Us Grow') {
                        if (userRoles?.length !== 1) {
                            if (screenState.isAdmin) {
                                box.boxText = `
                                    <h2>Donations Tracking</h2>
                                    <span>Connect, Engage, and Explore with Like-minded Individuals</span>
                                    `
                                box.buttonText = 'Manage Donations'
                                box.buttonLink = '/application'
                            }
                        }
                    }
                    if (box.buttonText === 'Learn More') {
                        if (userRoles?.length !== 1) {
                            if (screenState.isAdmin) {
                                box.boxText = `
                                <h2>User Management</h2>
                                <span>Connect, Engage, and Explore with Like-minded Individuals</span>
                                `
                                box.buttonText = 'Manage Users'
                                box.buttonLink = '/about'
                            }
                        }
                    }

                }
                return <div dangerouslySetInnerHTML={sanitizeHTML(box.boxText)} />
            }

            return (
                <div className={'box' + ' pos' + index + (box.isBlackFont ? ' dark-mode' : ' light-mode')} key={index} style={box.boxStyle} >
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
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className='intro'>
                {boxInfo()}

            </div>
            <div className='description'>
                <ScrollMore />
                <ClanExplenation paragraphText={shortText} paragraphTitle={explenationTitle} />
                <ImageSlider images={[icf1, icf2, icf4, icf5]} />
            </div>

        </motion.main>
    )
}

export default HomePage;