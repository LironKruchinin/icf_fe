import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiRequest } from '../services/api'
import { EventData } from '../interface/Event'
import { convertToDate } from '../utils/dateHandler'

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
            <p>mission name: {event?.eventName}</p>
            <p>last date to vote: {convertToDate(event?.eventCloseDate)}</p>
            <p>mission date: {convertToDate(event?.createdAt)}</p>
            <div className='members-list'>
                <div>members: {event?.users?.map(user => {
                    return <div key={user._id}>{user.user_name}</div>
                })}</div>
            </div>

            <div className='voting'>

            </div>
        </div>
    )
}

export default MissionPage