import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { RegisterFormData } from '../interface/Register';
import { apiRequest } from '../services/api';
import { setLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { fetchUserData, loginUser } from '../features/profileSlice';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../cmps/LoadingSpinner';
import { setCookie } from '../utils/Cookie';
import SideDisplay from '../cmps/SideDisplay';


const RegisterPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: '',
        first_name: '',
        user_name: '',
        phone_number: ''
    })

    const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault()
        setIsLoading(true)
        setFormData({
            email: '',
            password: '',
            first_name: '',
            user_name: '',
            phone_number: ''
        })
        const data = await apiRequest('POST', `${process.env.REACT_APP_LOCAL_API_URL}/auth/register`, formData)
        const { access_token } = await apiRequest('POST', `${process.env.REACT_APP_LOCAL_API_URL}/auth/login`, { email: formData.email, password: formData.password })
        dispatch(loginUser(formData.email))
        setCookie('accessToken', access_token, 3)
        // setLocalStorage('accessToken', JSON.stringify(access_token))
        if (access_token) {
            dispatch(fetchUserData(formData.email))
            navigate('/')
            setIsLoading(false)
        } else {
            navigate('/')
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading && <LoadingSpinner />}

            <div className="form-container">
                <motion.form onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <h2>Let's get started!</h2>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email"
                        required
                        id="email"
                        onChange={handleInput}
                        placeholder='Enter your email'
                        value={formData.email} />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"
                        required
                        id="password"
                        onChange={handleInput}
                        placeholder='Enter your password'
                        value={formData.password} />

                    <label htmlFor="first_name">First name</label>
                    <input type="text" name="first_name"
                        required
                        id="first name"
                        onChange={handleInput}
                        placeholder='Enter your first name'
                        value={formData.first_name} />

                    <label htmlFor="user_name">User name</label>
                    <input type="text" name="user_name"
                        required
                        id="user_name"
                        onChange={handleInput}
                        placeholder='Enter your user name'
                        value={formData.user_name} />

                    <label htmlFor="phone_number">Phone number</label>
                    <input type="tel" name="phone_number"
                        required
                        id="phone_number"
                        onChange={handleInput}
                        placeholder='Enter your phone number'
                        value={formData.phone_number} />

                    <button>Sign up</button>
                </motion.form >
                <aside className='side-display'><SideDisplay /></aside>
            </div>
        </>
    )
}
export default RegisterPage
