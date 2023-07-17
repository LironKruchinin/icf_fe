import React from 'react'
import { NavLink } from 'react-router-dom'
import { Links } from '../interface/Header'
import icfImage from '../assets/images/icf_logo.png'

type Props = {}

const AppHeader = (props: Props) => {
    const links: Links[] = [
        { pagePath: '/login', linkName: 'Login' },
        { pagePath: '/register', linkName: 'Register' },
        { pagePath: '/about', linkName: 'About' },
        { pagePath: '/contact', linkName: 'Contact' },
    ]


    return (
        <nav>
            <ul>
                <div className='left-side'>
                    <li>
                        <NavLink to={'/'}>
                            <div className="img-container"><img src={icfImage} /></div>
                            ICF
                        </NavLink>
                    </li>
                </div>
                <div className="links">
                    {links?.map((link, index) => {
                        return (
                            <NavLink to={link.pagePath} key={index}>
                                <li>
                                    {link.linkName}
                                </li>
                            </NavLink>

                        )
                    })}
                </div>
            </ul>
        </nav>
    )
}

export default AppHeader