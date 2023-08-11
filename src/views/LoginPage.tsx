import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { LoginFormData } from '../interface/Login'
import { apiPostRequest } from '../services/api'
import { setLocalStorage } from '../utils/localStorage'
import { useNavigate } from 'react-router-dom'
import { fetchUserData, loginUser } from '../features/profileSlice'
import { AppDispatch, RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import LoadingSpinner from '../cmps/LoadingSpinner'
import { setCookie } from '../utils/Cookie'


const LoginPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const screenState = useSelector((state: RootState) => state.userProfile)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
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
            password: ''
        })
        const { access_token } = await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_URL}/login`, formData)
        setLocalStorage('accessToken', JSON.stringify(access_token))
        dispatch(loginUser(formData.email))
        setCookie('accessToken', access_token, 3)
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
            <h2>Welcome!</h2>

            <div className='form-container'>
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
                    <button>Log in</button>
                </motion.form>

                <div>test</div>

            </div>
        </>
    )
}

export default LoginPage

