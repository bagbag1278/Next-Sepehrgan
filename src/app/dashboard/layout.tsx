import React, { FC, ReactNode } from 'react'
interface IChildren{
    children:ReactNode;
}
const DashboardLayout:FC<IChildren> = ({children}) => {
  return (
    <div dir='rtl' className='min-h-screen flex justify-center items-center'>
      {children}
    </div>
  )
}

export default DashboardLayout
