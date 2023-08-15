import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { apiPostRequest } from '../services/api'
import { UserData } from '../interface/User'
import ClanExplenation from '../cmps/ClanExplenation'
import { useNavigate } from 'react-router-dom'

type Props = {}

const AboutPage = (props: Props) => {
    const [users, setUsers] = useState<[UserData]>()
    const navigate = useNavigate()

    const paragraphText = `We are a clan that focuses on realism while trying to gain experiences vibe and to make fun at the same time. 
    We are a unit that always wants to develop ourself and we welcome most players with open arms and believe that we can bring everyone to a high level of control in the game.
    The unit simulates the diverse capabilities within the IDF and maintains a very high level of professionalism while performing various tasks and training. Our unit has real operators who in their daily lives are engaged in the fields of warfare in the IDF and gives thier point of view and diversity to the tasks from their personal experience during their time as fighters.
    In our clan, we emphasize an immersive experience that gives the sense of reality in battle and lets the player enter a combative character whether in communication or in actions.`
    const paragraphTitle = 'Embark on an Authentic Battlefield Journey with Our IDF-Inspired Clan!'
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const users = await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_URL}/users`, [])
        setUsers(users)
    }

    const navigateToProfile = (id: string | null) => {
        navigate(`/profile/${id}`)
    }

    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='about-page'
        >
            <ClanExplenation paragraphText={paragraphText} paragraphTitle={paragraphTitle} />

            <div className='users-table'>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => console.log('numbers')}>#</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={user._id} onClick={() => navigateToProfile(user._id)}>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.roles?.join(', ')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </motion.div>
    )
}

export default AboutPage