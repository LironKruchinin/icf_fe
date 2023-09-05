// change to HOC (events,group, role,gamerole)
import React, { useEffect, useState } from 'react'
import Modal from '../cmps/Modal'
import { GroupData } from '../interface/Group'
import { apiRequest } from '../services/api'
import { getCookie } from '../utils/Cookie'
import { BsPen } from 'react-icons/bs'
import { GameRole, UserData } from '../interface/User'
import Select from 'react-select'

interface SelectProps {
    value: {
        _id: string | null;
        first_name: string | null;
        user_name: string | null;
        gameRole: GameRole[] | null;
    };
    label: string | null;
}

const GroupPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState<string | null>()
    const [users, setUsers] = useState<SelectProps[]>([])
    const [groups, setGroups] = useState<GroupData[]>([])
    const [originalGroupData, setOriginalGroupData] = useState<GroupData>({
        groupName: '',
        groupDescription: '',
    })
    const [groupData, setGroupData] = useState<GroupData>({
        groupName: '',
        groupDescription: '',
    })
    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsEdit(false)
        setError('')

        setGroupData({
            groupName: '',
            groupDescription: '',
        })
    }
    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        getGroups()
    }, [groupData])

    const getUsers = async () => {
        const users: UserData[] = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/auth/users`);
        users?.map(user => {
            setUsers(prevState => ([...prevState,
            {
                value: {
                    _id: user._id,
                    first_name: user.first_name,
                    user_name: user.user_name,
                    gameRole: user.gameRole
                },
                label: user.user_name
            }
            ]))

        })

    }

    const handleSelectChange = (selected: any) => {
        const lastSelected = selected[selected.length - 1]

        groupData.members?.push(lastSelected?.value)
        console.log(groupData);
    }

    const getGroups = async () => {
        const groups = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/group`)
        setGroups(groups)
    }

    const handleGroup = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target
        setGroupData(prevState => ({ ...prevState, [name]: value }))
    }

    const viewGroup = (id: string | undefined) => {

    }

    const deleteGroup = async (ev: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => {
        ev.stopPropagation()
        const deletedGroupIndex = groups.findIndex(group => group._id === id)
        const deletedGruop = groups[deletedGroupIndex]
        try {
            if (deletedGroupIndex !== -1) {
                const newGroup = groups.filter(group => group._id !== id)
                setGroups(newGroup)
                await apiRequest('DELETE', `${process.env.REACT_APP_LOCAL_API_URL}/group/${id}`)
            }
        } catch (err) {
            console.error("Error deleting event:", err)
            if (deletedGroupIndex !== -1) {
                setGroups(prevGroup => {
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
        const gropuToEdit = groups.find(group => group._id === id)
        if (gropuToEdit) {
            setGroupData(gropuToEdit)
            setOriginalGroupData(gropuToEdit)
        }
    }

    const submitGroup = async (ev: React.FormEvent) => {
        ev.preventDefault()
        const accessToken = getCookie('accessToken')
        groupData.createdAt = Date.now()

        try {
            if (isEdit) {
                if (groupData.groupName === originalGroupData.groupName) return
                await apiRequest(
                    'PATCH',
                    `${process.env.REACT_APP_LOCAL_API_URL}/group/${groupData._id}`,
                    groupData,
                    { Authorization: `Bearer ${accessToken}` }
                )
            } else {
                await apiRequest(
                    'POST',
                    `${process.env.REACT_APP_LOCAL_API_URL}/group`,
                    groupData,
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
                    {isEdit ? <h2>group Editor</h2> : <h2>group Creator</h2>}
                    <div>
                        <label htmlFor="group-name">Group name: </label>
                        <input
                            autoFocus
                            type="text"
                            required
                            id='group-name'
                            name='groupName'
                            onChange={(ev) => handleGroup(ev)}
                            value={groupData.groupName}
                        />
                    </div>
                    <div>
                        <label htmlFor="group-description">Group Description: </label>
                        <input
                            type="text"
                            id='group-description'
                            name='groupDescription'
                            onChange={(ev) => handleGroup(ev)}
                            value={groupData.groupDescription}
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

            {groups.map(group => (
                <div key={group._id} onClick={() => viewGroup(group._id)}>
                    <button onClick={(ev) => deleteGroup(ev, group._id)}>X</button>
                    <span>{group.groupName}</span>
                    <button onClick={(ev) => editGroup(ev, group._id)}><BsPen /></button>
                </div>
            ))}
        </div>
    )
}

export default GroupPage