import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import AboutPage from '../views/AboutPage';
import ContactPage from '../views/ContactPage';
import HomePage from '../views/HomePage';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';
import Logout from './Logout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../features/profileSlice';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { AppDispatch, RootState } from '../store/store';
import PageNotFound from '../views/PageNotFound';
import EventsPage from '../views/EventsPage';
import DonationPage from '../views/DonationPage';
import ProfilePage from '../views/ProfilePage';

const AnimatedRoutes = () => {
    const location = useLocation()
    const dispatch: AppDispatch = useDispatch()
    const userEmail = useSelector((state: RootState) => state.userProfile.data)

    const hasUserDataBeenFetched = useSelector((state: RootState) => state.userProfile.fetched);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        const isProfileRoute = location.pathname.startsWith('/profile/');

        if (token && !isProfileRoute && !hasUserDataBeenFetched) {
            dispatch(fetchUserData(userEmail?.email));
        }
    }, [dispatch, location.pathname, userEmail?.email, hasUserDataBeenFetched]);


    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<HomePage />} />
                <Route path='/profile/:id' element={<ProfilePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/event' element={<EventsPage />} />
                <Route path='/support' element={<DonationPage />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;
