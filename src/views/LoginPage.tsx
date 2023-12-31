import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../cmps/LoadingSpinner'
import { loginUser } from '../features/profileSlice'
import { LoginFormData } from '../interface/Login'
import { apiRequest } from '../services/api'
import { AppDispatch } from '../store/store'
import { setCookie } from '../utils/Cookie'
import SideDisplay from '../cmps/SideDisplay'


const LoginPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>()
    const [isLoading, setIsLoading] = useState(false)
    const [isRememberPassword, setIsRememberPassword] = useState(false)
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    })


    const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault()
        Object.keys(formData).forEach((key: keyof LoginFormData) => {
            if (formData[key] === '') {
                setError(prevState => `${key} is Empty`)
            }
        })

        setIsLoading(true)
        setFormData({
            email: '',
            password: '',
        })
        try {
            const { access_token, user } = await apiRequest(
                'POST',
                `${process.env.REACT_APP_LOCAL_API_URL}/auth/login`,
                formData)
            console.log('user', user);

            dispatch(loginUser(user))

            if (isRememberPassword) setCookie('accessToken', access_token, 9)
            else setCookie('accessToken', access_token)

            if (access_token) {
                navigate('/')
                setIsLoading(false)
            } else {
                navigate('/')
                setIsLoading(false)
            }
        } catch (err) {
            setError('Incorrect username or password')
        } finally {
            setIsLoading(false)
        }
    }

    const checkIfEmpty = (inputName: keyof LoginFormData) => {
        const isEmpty = formData[inputName]
        if (isEmpty?.toString().length > 0) return true
        else return false
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
                    <h2 className='header-login'>Welcome back!</h2>
                    <label htmlFor="email">Email</label>
                    <input
                        onBlur={() => checkIfEmpty('email')}
                        className={checkIfEmpty('email') ? 'empty' : ''}
                        type="text"
                        name="email"
                        id="email"
                        autoFocus
                        autoComplete='email'
                        onChange={handleInput}
                        placeholder='Enter your email'
                        value={formData.email} />

                    <label htmlFor="password">Password</label>
                    <input
                        onBlur={() => checkIfEmpty('password')}
                        className={checkIfEmpty('email') ? 'empty' : ''}
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleInput}
                        autoComplete="current-password"
                        placeholder='Enter your password'
                        value={formData.password} />

                    <div className='login-tools'>
                        <div>
                            <input
                                type="checkbox"
                                name="remember-password"
                                id="remember-password"
                                defaultChecked={isRememberPassword}
                                onChange={() => setIsRememberPassword((prevState) => !prevState)} />
                            <label htmlFor="remember-password">Remember your password?</label>
                        </div>
                        <a href="">Forgot your password?</a>
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

