import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { apiPostRequest } from '../services/api'
import { UserData } from '../interface/User'

type Props = {}

const AboutPage = (props: Props) => {
    const [users, setUsers] = useState<[UserData]>()

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        const users = await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_URL}/users`, [])
        setUsers(users)
    }


    return (
        <motion.div initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {users?.map((user, index) => { return <div key={user._id}>{user.email}</div> })}
        </motion.div>
    )
}

export default AboutPage