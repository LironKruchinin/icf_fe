import { useEffect, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { HiMoon, HiSun } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import icfImage from '../assets/images/icf_logo.png';
import { Links } from '../interface/Header';
import { RootState, persistor } from '../store/store';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import ToggleSwitch from './ToggleSwitch';
import { getCookie, removeCookie } from '../utils/Cookie';
import { logoutUser } from '../features/profileSlice';

const AppHeader = () => {
    const [isDarkmode, setIsDarkMode] = useState<boolean | null>(getLocalStorage('isDarkMode'))
    const screenState = useSelector((state: RootState) => state.userProfile)
    const hasAuthCookie = getCookie('accessToken')
    const links: Links[] = [
        ...(screenState.isAuthenticated ? [
            { pagePath: `/profile/${screenState.data?._id}`, linkName: <BsPersonCircle /> },
            { pagePath: '/donate', linkName: 'Donate' },
            { pagePath: '/about', linkName: 'About' },
            { pagePath: '/contact', linkName: 'Contact' },
            { pagePath: '/logout', linkName: 'Sign out' },
        ] : [
            { pagePath: '/login', linkName: 'Login' },
            { pagePath: '/register', linkName: 'Register' },
            { pagePath: '/about', linkName: 'About' },
            { pagePath: '/contact', linkName: 'Contact' },
        ])
    ]
    console.log('roles', screenState);

    const hasAdminRole = screenState.data?.roles.includes('owner') || screenState.data?.roles.includes('admin') ? true : false
    console.log('hasAdminRole', hasAdminRole);

    if (hasAdminRole) links.push({ pagePath: '/admin-panel', linkName: 'Panel' })

    useEffect(() => {
        document.body.className = isDarkmode ? 'dark-mode' : 'light-mode'
    }, [isDarkmode, screenState])

    const toggleDarkMode = (isOn: boolean) => {
        setIsDarkMode(isOn)
        setLocalStorage('isDarkMode', isOn)
    }

    return (
        <nav>
            <ul>
                <div className='left-side'>
                    <li>
                        <NavLink to={'/'}>
                            <div className="img-container"><img src={icfImage} alt="ICF Logo" /></div>
                            <h1>ICF</h1>
                        </NavLink>
                    </li>
                </div>
                <div className="links">
                    <ToggleSwitch
                        onToggle={toggleDarkMode}
                        checkedIcon={<HiMoon />}
                        unCheckedIcon={<HiSun />}
                        isOn={isDarkmode}
                    />
                    {links.map((link, index) => (
                        <NavLink to={link.pagePath} key={index}>
                            <li>{link.linkName}</li>
                        </NavLink>
                    ))}
                </div>
            </ul>
        </nav>
    )
}

export default AppHeader
