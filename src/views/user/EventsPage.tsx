import { useEffect, useState } from 'react';
import Calendar from '../../cmps/Calendar';
import Modal from '../../cmps/Modal';
import { EventData } from '../../interface/Event';
import { apiRequest } from '../../services/api';
import { getLocalStorage } from '../../utils/localStorage';
import { getCookie } from '../../utils/Cookie';
import { BsPen } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState<string | null>();
    const [events, setEvents] = useState<EventData[]>([]);
    const [eventData, setEventData] = useState<EventData>({
        eventName: '',
        eventDescription: '',
        eventDate: 0,
        eventCloseDate: 0,
        createdAt: 0
    });

    const millDay = 86400000;

    useEffect(() => {
        getEvents();
    }, [eventData]);

    const getEvents = async () => {
        const events = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/event`);
        setEvents(events);
    }

    const handleEvent = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target;
        if (name === 'eventDate') {
            const finalDate = Date.parse(value);
            const closeFormDate = finalDate - millDay;
            setEventData(prevState => ({ ...prevState, 'eventDate': finalDate, 'eventCloseDate': closeFormDate }));
        } else {
            setEventData(prevState => ({ ...prevState, [name]: value }));
        }
    }

    const submitEvent = async (ev: React.FormEvent) => {
        ev.preventDefault();
        const accessToken = getCookie('accessToken');
        const daysLeft = Math.ceil((eventData.eventDate - Date.now()) / millDay);
        eventData.createdAt = Date.now();

        if (daysLeft < 2) {
            setError('Mission too close');
            return;
        }

        try {
            if (isEdit) {
                await apiRequest(
                    'PATCH',
                    `${process.env.REACT_APP_LOCAL_API_URL}/event/${eventData._id}`,
                    eventData,
                    { Authorization: `Bearer ${accessToken}` }
                );
            } else {
                await apiRequest(
                    'POST',
                    `${process.env.REACT_APP_LOCAL_API_URL}/event`,
                    eventData,
                    { Authorization: `Bearer ${accessToken}` }
                );
            }
            getEvents();  // Reload events after updating or adding
        } catch (err) {
            console.error("Error:", err);
        } finally {
            closeModal();
        }
    }

    const deleteEvent = async (id: string | undefined) => {
        const deletedEventIndex = events.findIndex(event => event._id === id);
        const deletedEvent = events[deletedEventIndex];
        try {
            if (deletedEventIndex !== -1) {
                const newEvents = events.filter(event => event._id !== id);
                setEvents(newEvents);
                await apiRequest('DELETE', `${process.env.REACT_APP_LOCAL_API_URL}/event/${id}`);
            }
        } catch (err) {
            console.error("Error deleting event:", err);
            if (deletedEventIndex !== -1) {
                setEvents(prevEvents => {
                    const updatedEvents = [...prevEvents];
                    updatedEvents.splice(deletedEventIndex, 0, deletedEvent);
                    return updatedEvents;
                });
            }
        }
    }

    const editEvent = async (id: string | undefined) => {
        setIsEdit(true);
        const eventToEdit = events.find(event => event._id === id);
        if (eventToEdit) {
            setEventData(eventToEdit);
        }
    }

    const viewEvent = async (ev: React.MouseEvent<HTMLDivElement>, id: string | undefined) => {
        ev.stopPropagation();
        // navigate(`/mission/${id}`);
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEdit(false);
        setError('');

        // Reset eventData state on close
        setEventData({
            eventName: '',
            eventDescription: '',
            eventDate: 0,
            eventCloseDate: 0,
            createdAt: 0,
        });
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
                            type="text"
                            required
                            id='event-name'
                            name='eventName'
                            onChange={(ev) => handleEvent(ev)}
                            value={eventData.eventName}
                        />
                    </div>
                    <div>
                        <label htmlFor="event-name">Event Description: </label>
                        <input
                            type="text"
                            id='event-name'
                            name='eventDescription'
                            onChange={(ev) => handleEvent(ev)}
                            value={eventData.eventDescription}
                        />
                    </div>
                    <Calendar handleEvent={handleEvent} isRequired={true}>
                        <label htmlFor="calendar">Final date</label>
                    </Calendar>
                    {error && <p className="error-message">{error}</p>}
                    <button onClick={(ev) => submitEvent(ev)}>Submit</button>
                </Modal>
            )}

            {events?.map(event => (
                <div key={event._id} onClick={(ev) => viewEvent(ev, event._id)}>
                    <button onClick={() => deleteEvent(event._id)}>X</button>
                    <span>{event.eventName}</span>
                    <button onClick={() => editEvent(event._id)}><BsPen /></button>
                </div>
            ))}
        </div>
    );
}

export default App;
