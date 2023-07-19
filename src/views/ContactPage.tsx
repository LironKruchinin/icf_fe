import { motion } from 'framer-motion'
import React from 'react'

type Props = {}

const ContactPage = (props: Props) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: 80, left: 0, right: 0, bottom: 0 }}>ContactPage</motion.div>
    )
}

export default ContactPage