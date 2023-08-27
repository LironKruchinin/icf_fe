import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiMoon, HiSun } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import icfImage from '../assets/images/icf_logo.png';
import { logoutUser } from '../features/profileSlice';
import { Links } from '../interface/Header';
import { AppDispatch, RootState, persistor } from '../store/store';
import { getCookie, removeCookie } from '../utils/Cookie';
import { getLocalStorage, removeLocalStorageKey, setLocalStorage } from '../utils/localStorage';
import LoadingSpinner from './LoadingSpinner';
import ToggleSwitch from './ToggleSwitch';
import UserPic from './UserPic';

const AppHeader = () => {
    const dispatch: AppDispatch = useDispatch()
    const { t, i18n } = useTranslation()
    const [isDarkmode, setIsDarkMode] = useState<boolean | null>(getLocalStorage('isDarkMode'))
    const screenState = useSelector((state: RootState) => state.profile)
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const authCookie = getCookie('accessToken')
    const timeout = 1000
    const navigate = useNavigate()
    const links: Links[] = [
        ...(screenState.isAuthenticated ? [
            { pagePath: `/profile/${screenState.data?._id}`, linkName: <UserPic username={screenState.data?.first_name} userColor={screenState.data?.user_color} /> },
            { pagePath: '/donate', linkName: 'donate' },
            { pagePath: '/about', linkName: 'about' },
            { pagePath: '/contact', linkName: 'contact' },
        ] : [
            { pagePath: '/login', linkName: 'login' },
            { pagePath: '/register', linkName: 'register' },
            { pagePath: '/about', linkName: 'about' },
            { pagePath: '/contact', linkName: 'contact' },
        ])
    ]
    const languages = [
        { code: 'en', label: 'En' },
        { code: 'he', label: 'He' }
    ]
    const checkCookieExpiration = useCallback(() => {
        const currentAuthCookie = getCookie('accessToken');
        if (!currentAuthCookie) {
            console.log('removing cookie');
            signOut();
        }
    }, []);
    if (screenState.data && (screenState.data.roles?.includes('owner') || screenState.data.roles?.includes('admin'))) links.push({ pagePath: '/admin-panel', linkName: 'panel' })

    useEffect(() => {
        checkCookieExpiration()
        document.body.className = isDarkmode ? 'dark-mode' : 'light-mode'

        document.addEventListener("visibilitychange", () => {
            console.log('authCookie', authCookie);
            if (!document.hidden) {
                checkCookieExpiration()
            }
        })
        return () => {
            document.removeEventListener("visibilitychange", checkCookieExpiration);
        }
    }, [checkCookieExpiration, isDarkmode, screenState]);

    // useEffect(() => {
    //     document.body.className = isDarkmode ? 'dark-mode' : 'light-mode'
    // }, [isDarkmode, screenState])

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode)
        document.documentElement.dir = langCode === 'he' ? 'rtl' : 'ltr'
    }

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
        }, timeout)
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

                    <div className="language-switcher">
                        {languages.map(lang => (
                            <button key={lang.code} onClick={() => changeLanguage(lang.code)}>
                                {lang.label}
                            </button>
                        ))}
                    </div>

                    {links.map((link, index) => {
                        if (index === 0) {
                            return <NavLink to={link.pagePath} key={index}>
                                <li>{link.linkName}</li>
                            </NavLink>
                        }

                        return <NavLink to={link.pagePath} key={index}>
                            <li>{t(`header.${link.linkName}`)}</li>
                        </NavLink>
                    })}

                    {screenState.isAuthenticated && (
                        <a>
                            <li onClick={signOut}>{t('header.signOut')}</li>
                        </a>
                    )}
                </div>
            </ul>
        </nav>
    )
}

export default AppHeader
