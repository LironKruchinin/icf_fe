import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { apiPostRequest } from '../services/api'
import { UserData } from '../interface/User'

type Props = {}

const AboutPage = (props: Props) => {
    const [users, setUsers] = useState<[UserData]>()

    useEffect(() => {
        getUsers()
        console.log(users);

    }, [])

    const getUsers = async () => {
        const users = await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_URL}/users`, [])
        setUsers(users)
    }


    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'absolute', top: 80, left: 0, right: 0, bottom: 0 }}
        >
            {users?.map(user => { return <div>{user.email}</div> })}
        </motion.div>
    )
}

export default AboutPage