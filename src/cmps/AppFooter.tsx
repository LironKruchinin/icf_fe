import React from 'react'
import { BsDiscord, BsTiktok } from 'react-icons/bs'
import { AiFillFacebook, AiFillYoutube, AiOutlineInstagram, AiOutlineCopyrightCircle } from 'react-icons/ai'
import { MediaLinks } from '../interface/Footer'

type Props = {}

const AppFooter = (props: Props) => {

    const mediaLinks: MediaLinks[] = [
        {
            iconName: 'BsDiscord',
            path: 'https://discord.gg/zwzPFPSa69',
            className: 'discord'
        },
        {
            iconName: 'BsTiktok',
            path: 'https://www.tiktok.com/@israeli_combined_forces?_t=8eJdP6hnkHK&_r=1',
            className: 'tiktok'
        },
        {
            iconName: 'AiFillYoutube',
            path: 'https://youtube.com/@israelicombinedforces2306',
            className: 'youtube'
        },
        {
            iconName: 'AiFillFacebook',
            path: 'https://www.facebook.com/profile.php?id=100093667832435&mibextid=ZbWKwL',
            className: 'facebook'
        },
        {
            iconName: 'AiOutlineInstagram',
            path: 'https://instagram.com/israeli_combined_forces_icf?igshid=MzRlODBiNWFlZA',
            className: 'instagram'
        },
    ]

    const getIconComponent = (iconName: string) => {
        switch (iconName) {
            case 'BsDiscord':
                return <BsDiscord />;
            case 'BsTiktok':
                return <BsTiktok />;
            case 'AiFillYoutube':
                return <AiFillYoutube />;
            case 'AiFillFacebook':
                return <AiFillFacebook />;
            case 'AiOutlineInstagram':
                return <AiOutlineInstagram />;
            default:
                return null;
        }
    }

    return (
        <footer>
            <div>
                {mediaLinks.map((link, index) => {
                    return (
                        <a className={'link ' + link.className} key={index} href={link.path} target='_blank' rel="noopener noreferrer">
                            {getIconComponent(link.iconName)}
                        </a>
                    )
                })}
            </div>
            <div>
                <span>version 1.0</span>
            </div>
            <div>
                <AiOutlineCopyrightCircle /><span>Israeli Combined Forces</span>
            </div>
        </footer>
    )
}

export default AppFooter