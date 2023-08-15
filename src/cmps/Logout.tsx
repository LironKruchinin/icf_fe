import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeLocalStorageKey } from '../utils/localStorage'
import { useDispatch } from 'react-redux'
import { AppDispatch, persistor } from '../store/store'
import { logoutUser } from '../features/profileSlice'
import LoadingSpinner from './LoadingSpinner'


const Logout = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const timeout = 1500

    useEffect(() => {
        signOut()

        return () => { clearTimeout(timeout) }
    }, [])




    const signOut = () => {
        Cookies.remove('accessToken')
        removeLocalStorageKey('accessToken')
        dispatch(logoutUser())
        persistor.purge()
        setTimeout(() => {
            navigate('/')
        }, timeout);
    }
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        ><LoadingSpinner />
        </motion.main>
    )
}

export default Logout