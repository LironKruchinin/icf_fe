import { AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { fetchUserData } from '../features/profileSlice';
import { AppDispatch, RootState } from '../store/store';
import HomePage from '../views/HomePage';
import LoginPage from '../views/LoginPage';
import NoPermissionPage from '../views/NoPermissionPage';
import PageNotFound from '../views/PageNotFound';
import ProfilePage from '../views/ProfilePage';
import RegisterPage from '../views/RegisterPage';
import AdminPanel from '../views/admin/AdminPanel';
import AboutPage from '../views/user/AboutPage';
import ApplicationPage from '../views/user/ApplicationPage';
import ContactPage from '../views/user/ContactPage';
import DonationPage from '../views/user/DonationPage';
import EventsPage from '../views/EventsPage';
import MissionPage from '../views/MissionPage';
import GroupPage from '../views/GroupPage';
import RolePage from '../views/RolePage';
import { apiRequest } from '../services/api';
import GameRolePage from '../views/GameRolePage';

const AnimatedRoutes = () => {
    const location = useLocation()
    const dispatch: AppDispatch = useDispatch()
    const userEmail = useSelector((state: RootState) => state.profile.data)
    const hasUserDataBeenFetched = useSelector((state: RootState) => state.profile.fetched);
    const state = useSelector((state) => state);
    console.log('state', state);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        const isProfileRoute = location.pathname.startsWith('/profile/');

        if (token && !isProfileRoute && !hasUserDataBeenFetched) {
            if (userEmail?.email) {
                console.log('hasUserDataBeenFetched', hasUserDataBeenFetched);

                const fetchData = async () => {
                    await dispatch(fetchUserData(userEmail.email));
                };

                fetchData().then(() => {
                    console.log('hasUserDataBeenFetched', hasUserDataBeenFetched);
                });
            }
        }

        return () => { }
    }, [dispatch, location.pathname, userEmail?.email, hasUserDataBeenFetched]);

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<HomePage />} />
                <Route path='/profile/:id' element={<ProfilePage />} />
                <Route path='/mission/:id' element={<MissionPage />} />
                <Route path='/application' element={<ApplicationPage />} />
                <Route path='/admin-panel' element={<AdminPanel />} />
                <Route path='/game-role' element={<GameRolePage />} />
                <Route path='/group' element={<GroupPage />} />
                <Route path='/role' element={<RolePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/contact' element={<ContactPage />} />
                <Route path='/mission' element={<EventsPage />} />
                <Route path='/support' element={<DonationPage />} />
                <Route path='/no-permission' element={<NoPermissionPage />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;
