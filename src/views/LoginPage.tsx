import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { LoginFormData } from '../interface/Login'
import { apiPostRequest } from '../services/api'
import { setLocalStorage } from '../utils/localStorage'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {
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
        if (access_token) navigate('/')
    }

    return (
        <>
            <h2>Welcome!</h2>

            <motion.form onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>

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