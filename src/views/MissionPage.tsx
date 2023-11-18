import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MissionData } from '../interface/Event';
import { apiRequest } from '../services/api';
import { RootState } from '../store/store';
import { getCookie } from '../utils/Cookie';
import { convertToDate } from '../utils/dateHandler';

type Props = {}

const MissionPage = (props: Props) => {
    const screenState = useSelector((state: RootState) => state.profile)
    const [isVoteMission, setIsVoteMission] = useState<boolean>(true)
    const { id } = useParams<{ id: string }>()
    const [event, setEvent] = useState<MissionData>()
    const millDay = 86400000
    const [votes, setVotes] = useState<Record<string, boolean | null>>({})
    const [userNames, setUserNames] = useState({});

    if (!id) {
        throw new Error("Event ID is required.")
    }

    useEffect(() => {
        const fetchData = async () => {
            await getMissionData()
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (screenState.data?.userGroups) {
            const initialVotes: Record<string, boolean | null> = {}
            screenState.data.userGroups.forEach(group => {
                initialVotes[group._id] = null
            })
            setVotes(initialVotes)
        }
    }, [screenState.data?.userGroups])

    const canVoteToEvent = (eventDate: number) => {
        if (eventDate) {
            const daysLeft = Math.ceil((eventDate - Date.now()) / millDay)
            setIsVoteMission(daysLeft <= 2)
        }
    }

    const getMissionData = async () => {
        const selectedMission: MissionData = await apiRequest('GET', `${process.env.REACT_APP_LOCAL_API_URL}/event/${id}`)
        setEvent(selectedMission)
        canVoteToEvent(selectedMission.eventDate)
    }

    const handleVoteChange = (groupId: string, vote: boolean) => {
        setVotes((prevVotes) => {
            const updatedVotes: Record<string, boolean> = {}
            for (const id in prevVotes) {
                updatedVotes[id] = id === groupId ? vote : !vote
            }
            return updatedVotes
        })
    }

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const userId = screenState.data?._id ?? 'No user found'


        const votesArray = Object.entries(votes).filter(([, vote]) => vote !== null)
            .map(([teamId, vote]) => {
                return { userId, teamId, vote: vote as boolean }
            })

        await sendVotes(votesArray)
    }

    const sendVotes = async (votesArray: { userId: string, teamId: string, vote: boolean }[]) => {
        const accessToken = getCookie('accessToken');
        await apiRequest(
            'POST',
            `${process.env.REACT_APP_LOCAL_API_URL}/event/voteMission/${id}`,
            votesArray,
            { Authorization: `Bearer ${accessToken}` }
        );
    };

    const getUserNames = async (ids: string[]) => {
        try {
            console.log(ids);

            const users = await apiRequest(
                'POST',
                `${process.env.REACT_APP_LOCAL_API_URL}/auth/users-array`,
                ids,
            )

        } catch (err) {

        }
    }

    return (
        <div className='container'>
            <div>
                <p>mission name: {event?.eventName}</p>
                <p>last date to vote: {convertToDate(event?.eventCloseDate)}</p>
                <p>mission date: {convertToDate(event?.createdAt)}</p>
                <div className='members-list'>
                    {screenState.data?.userGroups.map(group => (
                        <div key={group._id}>
                            <h3>Team: {group.groupName}</h3>
                            <label htmlFor={`go-${group._id}`}>
                                <input
                                    type="radio"
                                    disabled={isVoteMission}
                                    name={`vote-${group._id}`}
                                    id={`go-${group._id}`}
                                    checked={votes[group._id] === true}
                                    onChange={() => handleVoteChange(group._id, true)}
                                />
                                Going
                            </label>
                            <label htmlFor={`not-go-${group._id}`}>
                                <input
                                    disabled={isVoteMission}
                                    type="radio"
                                    name={`vote-${group._id}`}
                                    id={`not-go-${group._id}`}
                                    checked={votes[group._id] === false}
                                    onChange={() => handleVoteChange(group._id, false)}
                                />
                                Not Going
                            </label>
                        </div>
                    ))}
                    <form onSubmit={handleSubmit}>
                        <button disabled={isVoteMission} type='submit'>
                            Submit All
                        </button>
                    </form>
                </div>
            </div>

            <div>
                {event?.groups?.map(group => {
                    const attendees = group.votes?.filter(vote => vote.vote) || []
                    const nonAttendees = group.votes?.filter(vote => !vote.vote) || []

                    const attendeeUserIds = attendees.map(attendeeVote => attendeeVote.userId);
                    const nonAttendeeUserIds = nonAttendees.map(nonAttendeeVote => nonAttendeeVote.userId);
                    console.log(attendeeUserIds);

                    const user = getUserNames(attendeeUserIds);
                    getUserNames(nonAttendeeUserIds);

                    return (
                        <div key={group._id} className='group'>
                            <h3>{group.groupName}</h3>

                            <div className='attending-mission'>
                                <p>Attending:</p>
                                <ul>
                                    {attendees.map(attendeeVote => (
                                        <li key={attendeeVote._id}>{attendeeVote.userId}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className='not-attending-mission'>
                                <p>Not Attending:</p>
                                <ul>
                                    {nonAttendees.map(nonAttendeeVote => (
                                        <li key={nonAttendeeVote._id}>{nonAttendeeVote.userId}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default MissionPage;
