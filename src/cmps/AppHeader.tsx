import { useEffect, useState } from 'react';
import { HiMoon, HiSun } from "react-icons/hi2";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import icfImage from '../assets/images/icf_logo.png';
import { Links } from '../interface/Header';
import { RootState } from '../store/store';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import ToggleSwitch from './ToggleSwitch';
import { loginUser, logoutUser } from '../features/profileSlice';
import Cookies from 'js-cookie';

const AppHeader = () => {
    const [isDarkmode, setIsDarkMode] = useState<boolean | null>(getLocalStorage('isDarkMode'))
    const isAuthenticated = useSelector((state: RootState) => state.userProfile.isAuthenticated);
    const screenState = useSelector((state: RootState) => state.userProfile)
    const links: Links[] = [
        { pagePath: '/about', linkName: 'About' },
        { pagePath: '/contact', linkName: 'Contact' },
        ...(!isAuthenticated ? [
            { pagePath: '/login', linkName: 'Login' },
            { pagePath: '/register', linkName: 'Register' }
        ] : [
            { pagePath: '/donate', linkName: 'Donate' },
            { pagePath: '/logout', linkName: 'Sign out' },
        ]),
    ]

    // useEffect(() => {
    //     const token = Cookies.get('accessToken');

    //     if (token) {
    //         // You might want to verify the token with your backend here.
    //         // If the token is valid, dispatch the loginUser action.
    //         dispatch(loginUser());
    //     }
    // }, [dispatch])


    useEffect(() => {
        document.body.className = isDarkmode ? 'dark-mode' : 'light-mode'
        console.log('headers', screenState);

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

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
