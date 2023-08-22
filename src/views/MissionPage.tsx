import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiRequest } from '../services/api'
import { EventData } from '../interface/Event'

type Props = {}

const MissionPage = (props: Props) => {
    const { id } = useParams()
    const [event, setEvent] = useState<EventData>()

    useEffect(() => {
        getMissionData()
    }, [])

    const getMissionData = async () => {
        const selectedMission = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/event/${id}`)
        setEvent(selectedMission)
    }

    return (
        <div>
            <p>MissionPage {id}</p>
            <p>{event?.eventName} <span>{event?.createdAt}, {event?.eventCloseDate}</span></p>
        </div>
    )
}

export default MissionPage