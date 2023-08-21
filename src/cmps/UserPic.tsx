import React from 'react'

type UserPicProps = {
    username: string | undefined,
    userColor: string | undefined
}

const UserPic: React.FC<UserPicProps> = ({ username, userColor }) => {

    const profilePic = () => {

        if (username && (username.length > 2)) {
            return username?.slice(0, 3).toUpperCase()
        }
        return username?.toUpperCase()
    }

    return (
        <div className='user-pic' style={{ backgroundColor: userColor }} >
            {profilePic()}
        </div>
    )
}

export default UserPic