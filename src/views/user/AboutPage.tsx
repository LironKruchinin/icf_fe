import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ClanExplenation from '../../cmps/ClanExplenation'
import { UserData } from '../../interface/User'
import { apiRequest } from '../../services/api'
import { BsPen } from 'react-icons/bs'


const AboutPage = () => {
    const [users, setUsers] = useState<UserData[]>([])
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<'index' | 'email' | 'first_name' | 'roles' | 'gameRole'>('index');
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
        try {
            const users = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/auth/users`)
            setUsers(users)
        } catch (err) {
            throw err
        }

    }

    const navigateToProfile = (id: string | null) => {
        navigate(`/profile/${id}`)
    }

    const editUser = (ev: React.MouseEvent<HTMLButtonElement>, userId: string | null) => {
        ev.stopPropagation()
    }

    const handleSort = (column: 'index' | 'email' | 'first_name' | 'roles' | 'gameRole') => {
        if (column === sortColumn) {
            setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='about-page'
        >
            <ClanExplenation paragraphText={paragraphText} paragraphTitle={paragraphTitle} />

            <div className='users-table'>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('index')}># {sortDirection === 'asc' ? '▲' : '▼'}</th>
                            <th onClick={() => handleSort('email')} >Email  {sortDirection === 'asc' ? '▲' : '▼'}</th>
                            <th onClick={() => handleSort('first_name')}>First Name  {sortDirection === 'asc' ? '▲' : '▼'}</th>
                            <th>Roles</th>
                            <th onClick={() => handleSort('gameRole')}>Game roles  {sortDirection === 'asc' ? '▲' : '▼'}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {sortDirection === 'asc' ? users?.map((user, index) => (
                            <tr key={user._id} onClick={() => navigateToProfile(user?._id)}>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.roles?.join(', ')}</td>
                                <td>{user.gameRole?.join(', ')}</td>
                                <td><button onClick={(ev) => editUser(ev, user?._id)}><BsPen /></button></td>
                            </tr>
                        )) : [...users]?.reverse().map((user, index) => (
                            <tr key={user._id} onClick={() => navigateToProfile(user?._id)}>
                                <td>{users.length - index}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.roles?.join(', ')}</td>
                                <td>{user.gameRole?.join(', ')}</td>
                                <td><button onClick={(ev) => editUser(ev, user?._id)}><BsPen /></button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </motion.div >
    )
}

export default AboutPage