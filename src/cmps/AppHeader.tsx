import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Links } from '../interface/Header'
import icfImage from '../assets/images/icf_logo.png'
import { HiMoon, HiSun } from "react-icons/hi2";
import ToggleSwitch from './ToggleSwitch';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type Props = {}

const AppHeader = (props: Props) => {
    const [isDarkmode, setIsDarkMode] = useState<boolean | null>(
        getLocalStorage('isDarkMode')
    );
    const screenState = useSelector((state: RootState) => state.userProfile)
    const links: Links[] = [
        { pagePath: '/about', linkName: 'About' },
        { pagePath: '/contact', linkName: 'Contact' },
        { pagePath: '/login', linkName: 'Login' },
        { pagePath: '/register', linkName: 'Register' },
    ]

    useEffect(() => {
        document.body.className = isDarkmode ? 'dark-mode' : 'light-mode'
    }, [isDarkmode])

    const toggleDarkMode = (isOn: boolean) => {
        setIsDarkMode(isOn);
        setLocalStorage('isDarkMode', isOn)
    }


    return (
        <nav>
            <ul>
                <div className='left-side'>
                    <li>
                        <NavLink to={'/'}>
                            <div className="img-container"><img src={icfImage} /></div>
                            <h1>ICF</h1>
                        </NavLink>
                    </li>
                </div>
                <div className="links">
                    <ToggleSwitch onToggle={toggleDarkMode} checkedIcon={<HiMoon />} unCheckedIcon={<HiSun />} isOn={isDarkmode} />
                    {links?.map((link, index) => {

                        return (
                            <NavLink to={link.pagePath} key={index}>
                                <li>
                                    {link.linkName}
                                </li>
                            </NavLink>
                        )
                    })}
                </div>
            </ul>
        </nav>
    )
}

export default AppHeader