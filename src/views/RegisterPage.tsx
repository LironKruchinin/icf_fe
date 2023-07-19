import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { RegisterFormData } from '../interface/Register';
import { apiPostRequest } from '../services/api';


const RegisterPage = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: '',
        first_name: '',
        user_name: '',
        phone_number: ''
    })

    const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(target.name);
        const { value, name } = target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault()
        setFormData({
            email: '',
            password: '',
            first_name: '',
            user_name: '',
            phone_number: ''
        })
        console.log(formData);
        await apiPostRequest(`${process.env.REACT_APP_LOCAL_API_URL}/register`, formData)
    }

    return (
        <>
            <h2>Let's get started!</h2>

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

                <label htmlFor="first_name">First name:</label>
                <input type="text" name="first_name"
                    required
                    id="first name"
                    onChange={handleInput}
                    placeholder='Enter your first name'
                    value={formData.first_name} />

                <label htmlFor="user_name">User name:</label>
                <input type="text" name="user_name"
                    required
                    id="user_name"
                    onChange={handleInput}
                    placeholder='Enter your user name'
                    value={formData.user_name} />

                <label htmlFor="phone_number">Phone number:</label>
                <input type="tel" name="phone_number"
                    required
                    id="phone_number"
                    onChange={handleInput}
                    placeholder='Enter your phone number'
                    value={formData.phone_number} />

                <button>Sign up</button>
            </motion.form >
        </>
    )
}

export default RegisterPage