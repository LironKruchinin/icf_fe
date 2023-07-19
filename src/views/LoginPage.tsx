import { motion } from 'framer-motion'
import React from 'react'

type Props = {}

const LoginPage = (props: Props) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>LoginPage</motion.div>
    )
}

export default LoginPage