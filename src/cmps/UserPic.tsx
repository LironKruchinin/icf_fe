import React from 'react'

type UserPicProps = {
    username: string | undefined,
    userColor: string | undefined
}

const UserPic: React.FC<UserPicProps> = ({ username, userColor }) => {

    const getFontColor = (backgroundColor: string): string => {
        const color = backgroundColor.substring(1)  // strip #
        const rgb = parseInt(color, 16)
        const r = (rgb >> 16) & 0xff
        const g = (rgb >> 8) & 0xff
        const b = (rgb >> 0) & 0xff


        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b // relative luminance formula
        console.log(luminance < 128 ? 'white' : 'black');
        return luminance < 128 ? 'white' : 'black'  // 128 is mid-point in RGB scale
    }

    const profilePic = () => {

        if (username && (username.length > 2)) {
            return username?.slice(0, 3).toUpperCase()
        }
        return username?.toUpperCase()
    }

    return (
        <div className='user-pic' style={{ backgroundColor: userColor, color: getFontColor(userColor || '#FFFFFF') }} >
            {profilePic()}
        </div>
    )
}

export default UserPic