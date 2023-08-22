import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiRequest } from '../services/api';
import { getCookie } from '../utils/Cookie';
import { UserData } from '../interface/User';

type Props = {};

const ProfilePage = (props: Props) => {
    const { id } = useParams()
    const [authCookie, setAutCookie] = useState<string>()
    const [user, setUser] = useState<UserData>()

    useEffect(() => {
        getUserProfile()

        setAutCookie(getCookie('accessToken'))
    }, [])

    const getUserProfile = async () => {
        const selectedUser = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/auth/profile/${id}`)
        setUser(selectedUser)
    }

    return <div className='profile-page'>
        Email: {user?.email}
    </div>
}

export default ProfilePage
