import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'

type Props = {}

const AdminPanel = (props: Props) => {
    const userData = useSelector((state: RootState) => state.profile.data)
    const navigate = useNavigate()

    useEffect(() => {
        if (userData) {

            const userRoles = userData?.roles
            const roleNames = userRoles?.map(role => role.roleName.toLowerCase()) || []

            const isAdminOrOwner = roleNames.includes('admin') || roleNames.includes('owner')

            if (!isAdminOrOwner) navigate('/no-permission')
            document.title = 'Administrators page';
        } else { navigate('/no-permission') }

        return () => {

        }
    }, [userData, navigate])

    const navigateToGroups = () => {
        navigate('/group')
    }

    return (
        <div>
            <div onClick={navigateToGroups}>Manage groups</div>
            <div>missionManagement</div>
            <div>statistics</div>
        </div>
    )
}

export default AdminPanel