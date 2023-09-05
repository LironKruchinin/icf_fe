import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MissionData } from '../interface/Event'
import { apiRequest } from '../services/api'
import { RootState } from '../store/store'
import { getCookie } from '../utils/Cookie'
import { convertToDate } from '../utils/dateHandler'

type Props = {}

const MissionPage = (props: Props) => {
    const screenState = useSelector((state: RootState) => state.profile)
    const [selectedVote, setSelectedVote] = useState<boolean | null>(null)
    const [isVoteMission, setIsVoteMission] = useState<boolean>(true)
    const { id } = useParams()
    const [event, setEvent] = useState<MissionData>()
    const millDay = 86400000

    if (!id) {
        throw new Error("Event ID is required.");
    }
    useEffect(() => {
        const fetchData = async () => {
            await getMissionData()
        }
        fetchData()
    }, [])


    const canVoteToEvent = (eventDate: number) => {
        if (eventDate) {
            const daysLeft = Math.ceil((eventDate - Date.now()) / millDay)
            console.log(daysLeft);

            if (daysLeft <= 2) setIsVoteMission(true)
            else setIsVoteMission(false)
        }


    }

    const getMissionData = async () => {
        const selectedMission: MissionData = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/event/${id}`)
        setEvent(selectedMission)
        canVoteToEvent(selectedMission.eventDate)
    }

    const handleVote = async (ev: React.FormEvent<HTMLFormElement>, groupId: string) => {
        ev.preventDefault();
        const userId = screenState.data?._id ?? 'No user found'
        if (selectedVote === null) {
            // Handle the case where no vote is selected
            return
        }
        await sendVote(userId, groupId, selectedVote);
    }

    const sendVote = async (userId: string, teamId: string, vote: boolean) => {
        const accessToken = getCookie('accessToken')
        await apiRequest(
            'POST',
            `${process.env.REACT_APP_LOCAL_API_URL}/event/voteMission/${id}`,
            { userId: userId, teamId: teamId, vote: vote },
            { Authorization: `Bearer ${accessToken}` })
    }

    return (
        <div>
            <p>mission name: {event?.eventName}</p>
            <p>last date to vote: {convertToDate(event?.eventCloseDate)}</p>
            <p>mission date: {convertToDate(event?.createdAt)}</p>
            <div className='members-list'>
                {screenState.data?.userGroups.map(group => {
                    return (
                        <div key={group._id}>
                            <h3>Team: {group.groupName}</h3>
                            <form onSubmit={(ev) => handleVote(ev, group._id)}>
                                <label htmlFor={`go-${group._id}`}>
                                    <input
                                        type="radio"
                                        disabled={isVoteMission}
                                        name="vote"
                                        id={`go-${group._id}`}
                                        checked={selectedVote === true}
                                        onChange={() => setSelectedVote(true)}
                                    />
                                    Going
                                </label>
                                <label htmlFor={`not-go-${group._id}`}>
                                    <input
                                        disabled={isVoteMission}
                                        type="radio"
                                        name="vote"
                                        id={`not-go-${group._id}`}
                                        checked={selectedVote === false}
                                        onChange={() => setSelectedVote(false)}
                                    />
                                    Not Going
                                </label>
                                <button
                                    disabled={isVoteMission}
                                    type='submit'
                                >Submit</button>
                            </form>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default MissionPage