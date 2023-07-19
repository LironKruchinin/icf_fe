import { motion } from 'framer-motion'
import React from 'react'

type Props = {}

const AboutPage = (props: Props) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>AboutPage</motion.div>
    )
}

export default AboutPage