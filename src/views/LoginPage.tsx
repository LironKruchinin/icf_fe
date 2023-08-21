import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../cmps/LoadingSpinner'
import { loginUser } from '../features/profileSlice'
import { LoginFormData } from '../interface/Login'
import { apiRequest } from '../services/api'
import { AppDispatch, RootState } from '../store/store'
import { setCookie } from '../utils/Cookie'
import { setLocalStorage } from '../utils/localStorage'
import SideDisplay from '../cmps/SideDisplay'


const LoginPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    // const screenState = useSelector((state: RootState) => state)
    const [error, setError] = useState<string | null>()
    const [isLoading, setIsLoading] = useState(false)
    const [isRememberPassword, setIsRememberPassword] = useState(false)
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        // isRememberPassword: false
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
            // isRememberPassword: false
        })
        try {
            const { access_token, user } = await apiRequest('POST', `${process.env.REACT_APP_LOCAL_API_URL}/auth/login`, formData)
            dispatch(loginUser(user))

            if (isRememberPassword) setCookie('accessToken', access_token, 3)
            else setCookie('accessToken', access_token)

            if (access_token) {
                navigate('/')
                setIsLoading(false)
            } else {
                navigate('/')
                setIsLoading(false)
            }
        } catch (err) {
            setError('Error logging in')
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className='container'>
            {isLoading && <LoadingSpinner />}

            <div className='form-container'>
                <motion.form onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <h2 className='header-login'>Welcome!</h2>
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

                    <div>
                        <input
                            type="checkbox"
                            name="remember-password"
                            id="remember-password"
                            value={formData.password}
                            defaultChecked={isRememberPassword}
                            onChange={() => setIsRememberPassword((prevState) => !prevState)} />
                        <label htmlFor="remember-password">aaa</label>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button>Log in</button>
                </motion.form>

                <aside className='side-display'><SideDisplay /></aside>

            </div>
        </div>
    )
}

export default LoginPage

