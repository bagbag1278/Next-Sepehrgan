import React, { ReactNode } from 'react'
import Header from '@/components/header/Header';
import Footer from '@/components/Footer/Footer';

interface Iparent {
    children: ReactNode;
}

const layout = ({ children }: Iparent) => {
    return (
        <>
        <Header />
            <main>
                {children}
            </main>
        <Footer />
        </>
    )
}

export default layout

