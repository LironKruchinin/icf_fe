import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { LoginFormData } from '../interface/Login'
import { apiPostRequest } from '../services/api'
import { setLocalStorage } from '../utils/localStorage'
import { useNavigate } from 'react-router-dom'
import { fetchUserData } from '../features/profileSlice'
import { AppDispatch, RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'


const LoginPage = () => {
    const dispatch: AppDispatch = useDispatch();
    const screenState = useSelector((state: RootState) => state.userProfile);
    const navigate = useNavigate()
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
        setFormData({
            email: '',
            password: ''
        })
        const { access_token } = await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_URL}/login`, formData)
        setLocalStorage('accessToken', JSON.stringify(access_token))
        if (access_token) {
            dispatch(fetchUserData(formData.email) as any)
            navigate('/')
            console.log(screenState);

        }
    }

    return (
        <>
            <h2>Welcome!</h2>

            <motion.form onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: 'absolute', top: 80, left: 0, right: 0, bottom: 0 }}
            >

                <label htmlFor="email">Email:</label>
                <input type="text" name="email"
                    required
                    id="email"
                    onChange={handleInput}
                    placeholder='Enter your email'
                    value={formData.email} />

                <label htmlFor="password">Password:</label>
                <input type="password" name="password"
                    required
                    id="password"
                    onChange={handleInput}
                    placeholder='Enter your password'
                    value={formData.password} />

                <button>Log in</button>
            </motion.form>
        </>
    )
}

export default LoginPage

function dispatch(arg0: any) {
    throw new Error('Function not implemented.')
}
