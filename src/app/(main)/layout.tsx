import Footer from '@/components/Footer/Footer'
import Header from '@/components/header/Header'
import React, { ReactNode } from 'react'

interface Ichindren {
    children: ReactNode,
}

const layout = ({ children }: Ichindren) => {
    return (
        <div className=''>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default layout