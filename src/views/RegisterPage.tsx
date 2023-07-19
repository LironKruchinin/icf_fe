import { motion } from 'framer-motion'
import React from 'react'

type Props = {}

const RegisterPage = (props: Props) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>RegisterPage</motion.div>
    )
}

export default RegisterPage