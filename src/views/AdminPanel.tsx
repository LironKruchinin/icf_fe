import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'

type Props = {}

const AdminPanel = (props: Props) => {
    const userData = useSelector((state: RootState) => state.userProfile.data)
    const navigate = useNavigate()
    useEffect(() => {
        if (userData) {
            const isAdminOrOwner = userData?.roles?.includes('admin') || userData?.roles?.includes('owner')

            if (!isAdminOrOwner) navigate('/no-permission')
        } else { navigate('/no-permission') }
        // console.log(userData?.roles)

        return () => {

        }
    }, [userData, navigate])


    return (
        <div>AdminPanel</div>
    )
}

export default AdminPanel