import { useEffect, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { HiMoon, HiSun } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import icfImage from '../assets/images/icf_logo.png';
import { Links } from '../interface/Header';
import { AppDispatch, RootState, persistor } from '../store/store';
import { getLocalStorage, removeLocalStorageKey, setLocalStorage } from '../utils/localStorage';
import ToggleSwitch from './ToggleSwitch';
import { getCookie, removeCookie } from '../utils/Cookie';
import { logoutUser } from '../features/profileSlice';
import UserPic from './UserPic';
import LoadingSpinner from './LoadingSpinner';

const AppHeader = () => {
    const dispatch: AppDispatch = useDispatch();
    const [isDarkmode, setIsDarkMode] = useState<boolean | null>(getLocalStorage('isDarkMode'))
    const screenState = useSelector((state: RootState) => state.userProfile)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const hasAuthCookie = getCookie('accessToken')
    const timeout = 1000
    const navigate = useNavigate()
    const links: Links[] = [
        ...(screenState.isAuthenticated ? [
            { pagePath: `/profile/${screenState.data?._id}`, linkName: <UserPic username={screenState.data?.first_name} userColor={screenState.data?.user_color} /> },
            { pagePath: '/donate', linkName: 'Donate' },
            { pagePath: '/about', linkName: 'About' },
            { pagePath: '/contact', linkName: 'Contact' },
            // { pagePath: '/logout', linkName: 'Sign out' },
        ] : [
            { pagePath: '/login', linkName: 'Login' },
            { pagePath: '/register', linkName: 'Register' },
            { pagePath: '/about', linkName: 'About' },
            { pagePath: '/contact', linkName: 'Contact' },
        ])
    ]

    if (screenState.data && (screenState.data.roles?.includes('owner') || screenState.data.roles?.includes('admin'))) links.push({ pagePath: '/admin-panel', linkName: 'Panel' })

    useEffect(() => {
        document.body.className = isDarkmode ? 'dark-mode' : 'light-mode'
    }, [isDarkmode, screenState])

    const toggleDarkMode = (isOn: boolean) => {
        setIsDarkMode(isOn)
        setLocalStorage('isDarkMode', isOn)
    }

    const signOut = () => {
        setIsLoggingOut(true)
        removeCookie('accessToken')
        removeLocalStorageKey('accessToken')
        dispatch(logoutUser())
        persistor.purge()
        setTimeout(() => {
            navigate('/')
            setIsLoggingOut(false)
        }, timeout);
    }

    return (
        <nav>
            {isLoggingOut && <LoadingSpinner />}
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
                    {screenState.isAuthenticated && (
                        <a>
                            <li onClick={signOut}>Sign out</li>
                        </a>
                    )}
                </div>
            </ul>
        </nav>
    )
}

export default AppHeader
