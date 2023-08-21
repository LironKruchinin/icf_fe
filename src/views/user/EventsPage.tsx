import { useEffect, useState } from 'react';
import Calendar from '../../cmps/Calendar';
import Modal from '../../cmps/Modal';
import { EventData } from '../../interface/Event';
import { apiRequest } from '../../services/api';
import { getLocalStorage } from '../../utils/localStorage';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [events, setEvents] = useState<EventData[]>([])
    const [eventData, setEventData] = useState<EventData>({
        eventName: '',
        eventDescription: '',
        eventDate: 0,
        eventCloseDate: 0,
        createdAt: 0
    })
    const millDay = 86400000

    useEffect(() => {
        console.log(eventData)
        getEvents()
    }, [eventData])

    const getEvents = async () => {
        const events = await apiRequest(`GET`, `${process.env.REACT_APP_LOCAL_API_URL}/event`)
        setEvents(events)
    }


    const handleEvent = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target
        const finalDate = Date.parse(value)
        // const daysLeft = Math.ceil((finalDate - Date.now()) / millDay)
        const closeFormDate = finalDate - millDay
        // const date = new Date(closeFormDate).

        if (name === 'eventDate') {
            setEventData(prevState => ({ ...prevState, 'eventDate': finalDate }))
            eventData.eventCloseDate = closeFormDate
        } else {
            setEventData(prevState => ({ ...prevState, [name]: value }))
        }

    }

    const submitEvent = async (ev: React.FormEvent) => {
        ev.preventDefault()
        const accessToken = getLocalStorage('accessToken')
        eventData.createdAt = Date.now()

        await apiRequest(
            'POST', `${process.env.REACT_APP_LOCAL_API_URL}/event`,
            eventData,
            { Authorization: `Bearer ${JSON.parse(accessToken)}` })
        setEventData({
            eventName: '',
            eventDescription: '',
            eventDate: 0,
            eventCloseDate: 0,
            createdAt: 0,
        })
    }

    const deleteEvent = async (id: string | undefined) => {
        // setIsDeleteModalOpen(true)

        // if (!isDeleteModalOpen) {
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

        // }
    }

    const viewEvent = async (id: string | undefined) => {
        try {

        } catch (err) {

        }
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        if (isModalOpen) setIsModalOpen(false)
        else if (isDeleteModalOpen) setIsDeleteModalOpen
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            {/* {isDeleteModalOpen &&
                <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
                    <h2>Do you want to delete the current event</h2>
                </Modal>
            } */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2>Event Creator</h2>
                <div>
                    <label htmlFor="event-name">Event name: </label>
                    <input type="text"
                        required
                        id='event-name'
                        name='eventName'
                        onChange={(ev) => handleEvent(ev)}
                        value={eventData.eventName} />
                </div>

                <div>
                    <label htmlFor="event-name">Event Description: </label>
                    <input type="text"
                        id='event-name'
                        name='eventDescription'
                        onChange={(ev) => handleEvent(ev)}
                        value={eventData.eventDescription} />
                </div>


                <Calendar handleEvent={handleEvent} isRequired={true} >
                    <label htmlFor="calendar">Final date</label>
                </Calendar>

                <button onClick={(ev) => submitEvent(ev)}>Submit</button>
            </Modal>

            {events?.map(event => {
                return (
                    <div key={event._id} onClick={() => viewEvent(event._id)}>
                        <button onClick={() => deleteEvent(event._id)}>X</button>
                        <span>{event.eventName}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default App
