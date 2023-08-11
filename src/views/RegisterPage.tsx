import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { RegisterFormData } from '../interface/Register';
import { apiPostRequest } from '../services/api';
import { setLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { fetchUserData, loginUser } from '../features/profileSlice';
import { AsyncThunkAction, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import LoadingSpinner from '../cmps/LoadingSpinner';
import Cookies from 'js-cookie';


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
        const data = await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_URL}/register`, formData)
        const { access_token } = await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_URL}/login`, { email: formData.email, password: formData.password })
        dispatch(loginUser(formData.email))
        Cookies.set('accessToken', access_token, { expires: 3, })
        setLocalStorage('accessToken', JSON.stringify(access_token))
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
            <h2>Let's get started!</h2>

            <div className="form-container">
                <motion.form onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="text" name="email"
                            required
                            id="email"
                            onChange={handleInput}
                            placeholder='Enter your email'
                            value={formData.email} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password"
                            required
                            id="password"
                            onChange={handleInput}
                            placeholder='Enter your password'
                            value={formData.password} />
                    </div>
                    <div>
                        <label htmlFor="first_name">First name:</label>
                        <input type="text" name="first_name"
                            required
                            id="first name"
                            onChange={handleInput}
                            placeholder='Enter your first name'
                            value={formData.first_name} />
                    </div>
                    <div>
                        <label htmlFor="user_name">User name:</label>
                        <input type="text" name="user_name"
                            required
                            id="user_name"
                            onChange={handleInput}
                            placeholder='Enter your user name'
                            value={formData.user_name} />
                    </div>
                    <div>
                        <label htmlFor="phone_number">Phone number:</label>
                        <input type="tel" name="phone_number"
                            required
                            id="phone_number"
                            onChange={handleInput}
                            placeholder='Enter your phone number'
                            value={formData.phone_number} />
                    </div>
                    <button>Sign up</button>
                </motion.form >
            </div>
        </>
    )
}
export default RegisterPage
