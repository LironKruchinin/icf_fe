import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import AboutPage from '../views/user/AboutPage';
import ContactPage from '../views/user/ContactPage';
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
import EventsPage from '../views/user/EventsPage';
import DonationPage from '../views/user/DonationPage';
import ProfilePage from '../views/ProfilePage';
import ApplicationPage from '../views/user/ApplicationPage';
import AdminPanel from '../views/admin/AdminPanel';
import NoPermissionPage from '../views/NoPermissionPage';

const AnimatedRoutes = () => {
    const location = useLocation()
    const dispatch: AppDispatch = useDispatch()
    const userEmail = useSelector((state: RootState) => state.userProfile.data)

    const hasUserDataBeenFetched = useSelector((state: RootState) => state.userProfile.fetched);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        const isProfileRoute = location.pathname.startsWith('/profile/');

        if (token && !isProfileRoute && !hasUserDataBeenFetched) {
            console.log('animated route', userEmail?.email);

            dispatch(fetchUserData(userEmail?.email));
        }
    }, [dispatch, location.pathname, userEmail?.email, hasUserDataBeenFetched]);


    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<HomePage />} />
                <Route path='/profile/:id' element={<ProfilePage />} />
                <Route path='/application' element={<ApplicationPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/admin-panel' element={<AdminPanel />} />
                <Route path='/event' element={<EventsPage />} />
                <Route path='/support' element={<DonationPage />} />
                <Route path='/no-permission' element={<NoPermissionPage />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;
