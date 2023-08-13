import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiPostRequest } from '../services/api';
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
        const selectedUser = await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_URL}/profile/${id}`)
        console.log(selectedUser)

        setUser(selectedUser)
    }

    return <div className='profile-page'>
        Email: {user?.email}
    </div>
}

export default ProfilePage
