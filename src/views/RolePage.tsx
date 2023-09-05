// change to HOC (events,group, role,gamerole)
import React, { useEffect, useState } from 'react'
import { BsPen } from 'react-icons/bs'
import Modal from '../cmps/Modal'
import { RoleData } from '../interface/Role'
import { apiRequest } from '../services/api'
import { getCookie } from '../utils/Cookie'
import Select from 'react-select'
import { UserData } from '../interface/User'

interface SelectProps {
    value: { _id: string | null, first_name: string | null, userName: string | null };
    label: string | null;
}

const RolePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState<string | null>()
    const [roles, setRoles] = useState<RoleData[]>([])
    const [users, setUsers] = useState<SelectProps[]>([])
    const [originalGroupData, setOriginalRoleData] = useState<RoleData>({
        roleName: '',
        roleDescription: '',
    })
    const [roleData, setRoleData] = useState<RoleData>({
        roleName: '',
        roleDescription: '',
    })
    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsEdit(false)
        setError('')

        setRoleData({
            roleName: '',
            roleDescription: '',
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        getRoles()
    }, [roleData])

    const getUsers = async () => {
        const users: UserData[] = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/auth/users`);
        users?.map(user => {
            setUsers(prevState => ([...prevState,
            {
                value: {
                    _id: user?._id,
                    first_name: user?.first_name,
                    userName: user?.user_name
                },
                label: user.user_name
            }
            ]))

        })

    }

    const getRoles = async () => {
        const roles = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/role`)
        setRoles(roles)
    }

    const handleGroup = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target
        setRoleData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSelectChange = (selected: any) => {
        console.log(selected);

    }

    const viewGroup = (id: string | undefined) => {

    }

    const deleteGroup = async (ev: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => {
        ev.stopPropagation()
        const deletedGroupIndex = roles.findIndex(group => group._id === id)
        const deletedGruop = roles[deletedGroupIndex]
        try {
            if (deletedGroupIndex !== -1) {
                const newGroup = roles.filter(group => group._id !== id)
                setRoles(newGroup)
                await apiRequest('DELETE', `${process.env.REACT_APP_LOCAL_API_URL}/group/${id}`)
            }
        } catch (err) {
            console.error("Error deleting event:", err)
            if (deletedGroupIndex !== -1) {
                setRoles(prevGroup => {
                    const updatedGruop = [...prevGroup]
                    updatedGruop.splice(deletedGroupIndex, 0, deletedGruop)
                    return updatedGruop
                })
            }
        }
    }

    const editGroup = (ev: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => {
        ev.stopPropagation()
        setIsEdit(true)
        const gropuToEdit = roles.find(group => group._id === id)
        if (gropuToEdit) {
            setRoleData(gropuToEdit)
            setOriginalRoleData(gropuToEdit)
        }
    }

    const submitGroup = async (ev: React.FormEvent) => {
        ev.preventDefault()
        const accessToken = getCookie('accessToken')
        roleData.createdAt = Date.now()

        try {
            if (isEdit) {
                if (roleData.roleName === originalGroupData.roleName) return
                await apiRequest(
                    'PATCH',
                    `${process.env.REACT_APP_LOCAL_API_URL}/role/${roleData._id}`,
                    roleData,
                    { Authorization: `Bearer ${accessToken}` }
                )
            } else {
                await apiRequest(
                    'POST',
                    `${process.env.REACT_APP_LOCAL_API_URL}/role`,
                    roleData,
                    { Authorization: `Bearer ${accessToken}` }
                )
            }
        } catch (err) {
            console.error("Error:", err)
        } finally {
            closeModal()
        }
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>

            {(isModalOpen || isEdit) && (
                <Modal isOpen={isModalOpen || isEdit} onClose={closeModal}>
                    {isEdit ? <h2>Role Editor</h2> : <h2>Role Creator</h2>}
                    <div>
                        <label htmlFor="group-name">Role name: </label>
                        <input
                            autoFocus
                            type="text"
                            required
                            id='group-name'
                            name='roleName'
                            onChange={(ev) => handleGroup(ev)}
                            value={roleData.roleName}
                        />
                    </div>
                    <div>
                        <label htmlFor="group-description">Group Description: </label>
                        <input
                            type="text"
                            id='group-description'
                            name='roleDescription'
                            onChange={(ev) => handleGroup(ev)}
                            value={roleData.roleDescription}
                        />
                    </div>
                    <Select
                        onChange={handleSelectChange}
                        options={users}
                        closeMenuOnSelect={false}
                        isClearable
                        isMulti
                        isSearchable={true}
                        name='userSelect'
                    />

                    {error && <p className="error-message">{error}</p>}
                    <button onClick={(ev) => submitGroup(ev)}>Submit</button>
                </Modal>
            )}

            {roles.map(role => (
                <div key={role._id} onClick={() => viewGroup(role._id)}>
                    <button onClick={(ev) => deleteGroup(ev, role._id)}>X</button>
                    <span>{role.roleName}</span>
                    <button onClick={(ev) => editGroup(ev, role._id)}><BsPen /></button>
                </div>
            ))}
        </div>
    )
}

export default RolePage