import Footer from '@/components/Footer/Footer'
import React, { ReactNode } from 'react'

interface Ichindren {
    children: ReactNode,
}

const layout = ({ children }: Ichindren) => {
    return (
        <div className=''>
            {children}
            <Footer />
        </div>
    )
}

export default layout