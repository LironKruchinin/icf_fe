// change to HOC (events,group, role,gamerole)

import { useEffect, useState } from 'react';
import Calendar from '../cmps/Calendar';
import Modal from '../cmps/Modal';
import { EventData } from '../interface/Event';
import { apiRequest } from '../services/api';
import { getLocalStorage } from '../utils/localStorage';
import { getCookie } from '../utils/Cookie';
import { BsPen } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../interface/User';
import Select from 'react-select'

interface SelectProps {
    value: string | null;
    label: string | null;
}

const EventsPage = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState<SelectProps[]>([])
    // const [usersForEvent, setUsersForEvent] = useState<UserData[]>([])
    const [selectedUsers, setSelectedUsers] = useState<SelectProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState<string | null>()
    const [events, setEvents] = useState<EventData[]>([])
    const [originalEventData, setOriginalEventData] = useState<EventData>({
        eventName: '',
        eventDescription: '',
        eventDate: 0,
    })
    const [eventData, setEventData] = useState<EventData>({
        eventName: '',
        eventDescription: '',
        eventDate: 0,
        eventCloseDate: 0,
        createdAt: 0,
        blacklistedUsers: []
    })

    const millDay = 86400000

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        getEvents()
    }, [eventData])

    const getUsers = async () => {
        const users: UserData[] = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/auth/users`);
        users?.map(user => {
            setUsers(prevState => ([...prevState,
            {
                value: user._id,
                label: user.user_name
            }
            ]))
        })
    }

    const getEvents = async () => {
        const events = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/event`)
        setEvents(events)
    }

    const handleEvent = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target
        if (name === 'eventDate') {
            const finalDate = Date.parse(value)
            const closeFormDate = finalDate - millDay
            setEventData(prevState => ({ ...prevState, 'eventDate': finalDate, 'eventCloseDate': closeFormDate }))
        } else {
            setEventData(prevState => ({ ...prevState, [name]: value }))
        }
    }

    const handleSelectChange = (selected: any) => {
        const selectedUserIds = selected.map((s: { value: string }) => s.value);

        setEventData(prevState => ({
            ...prevState,
            blacklistedUsers: selectedUserIds
        }));
        setSelectedUsers(selected)

    }

    const submitEvent = async (ev: React.FormEvent) => {
        ev.preventDefault()
        const accessToken = getCookie('accessToken')
        const daysLeft = Math.ceil((eventData.eventDate - Date.now()) / millDay)
        eventData.createdAt = Date.now()
        console.log(eventData);

        if (daysLeft < 2) {
            setError('Mission too close')
            return
        }
        try {
            if (isEdit) {
                // if (eventData.eventName === originalEventData.eventName) return
                await apiRequest(
                    'PATCH',
                    `${process.env.REACT_APP_LOCAL_API_URL}/event/${eventData._id}`,
                    eventData,
                    { Authorization: `Bearer ${accessToken}` }
                )
            } else {
                await apiRequest(
                    'POST',
                    `${process.env.REACT_APP_LOCAL_API_URL}/event`,
                    eventData,
                    { Authorization: `Bearer ${accessToken}` }
                )
            }
            getEvents()
        } catch (err) {
            console.error("Error:", err)
        } finally {
            closeModal()
        }
    }

    const deleteEvent = async (ev: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => {
        ev.stopPropagation()
        const deletedEventIndex = events.findIndex(event => event._id === id)
        const deletedEvent = events[deletedEventIndex]

        try {
            if (deletedEventIndex !== -1) {
                const newEvents = events.filter(event => event._id !== id)
                setEvents(newEvents)
                await apiRequest('DELETE', `${process.env.REACT_APP_LOCAL_API_URL}/event/${id}`)
            }
        } catch (err) {
            console.error("Error deleting event:", err)
            if (deletedEventIndex !== -1) {
                setEvents(prevEvents => {
                    const updatedEvents = [...prevEvents]
                    updatedEvents.splice(deletedEventIndex, 0, deletedEvent)
                    return updatedEvents
                })
            }
        }
    }

    const editEvent = async (ev: React.MouseEvent<HTMLButtonElement>, id: string | undefined) => {
        ev.stopPropagation()
        setIsEdit(true)
        const eventToEdit = events.find(event => event._id === id)
        if (eventToEdit) {
            setEventData(eventToEdit)
            setOriginalEventData(eventToEdit)
            const selectedUserIds = eventToEdit.blacklistedUsers || []; // replace with the actual user ids for this event
            const selected = users.filter(u => selectedUserIds.includes(u?.value!));
            setSelectedUsers(selected);
        }
    }

    const viewEvent = async (id: string | undefined) => {
        navigate(`/mission/${id}`)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsEdit(false)
        setError('')

        setEventData({
            eventName: '',
            eventDescription: '',
            eventDate: 0,
            eventCloseDate: 0,
            createdAt: 0,
            blacklistedUsers: []
        })
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>

            {(isModalOpen || isEdit) && (
                <Modal isOpen={isModalOpen || isEdit} onClose={closeModal}>
                    {isEdit ? <h2>Event Editor</h2> : <h2>Event Creator</h2>}
                    <div>
                        <label htmlFor="event-name">Event name: </label>
                        <input
                            autoFocus
                            type="text"
                            required
                            id='event-name'
                            name='eventName'
                            onChange={(ev) => handleEvent(ev)}
                            value={eventData.eventName}
                        />
                    </div>
                    <div>
                        <label htmlFor="event-description">Event Description: </label>
                        <input
                            type="text"
                            id='event-description'
                            name='eventDescription'
                            onChange={(ev) => handleEvent(ev)}
                            value={eventData.eventDescription}
                        />
                    </div>
                    <label htmlFor="blacklist">Blacklisted Users:
                        <Select
                            value={selectedUsers}
                            onChange={handleSelectChange}
                            options={users}
                            closeMenuOnSelect={false}
                            isClearable
                            id='blacklist'
                            isMulti
                            isSearchable={true}
                            name='userSelect'
                        />
                    </label>
                    <Calendar handleEvent={handleEvent} isRequired={true}>
                        <label htmlFor="calendar">Final date</label>
                    </Calendar>
                    {error && <p className="error-message">{error}</p>}
                    <button onClick={(ev) => submitEvent(ev)}>Submit</button>
                </Modal>
            )}

            {events?.map(event => (
                <div key={event._id} onClick={() => viewEvent(event._id)}>
                    <button onClick={(ev) => deleteEvent(ev, event._id)}>X</button>
                    <span>{event.eventName}</span>
                    <button onClick={(ev) => editEvent(ev, event._id)}><BsPen /></button>
                </div>
            ))}
        </div>
    )
}

export default EventsPage
