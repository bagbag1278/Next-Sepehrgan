import React, { FC, ReactNode } from 'react'
interface IChildren{
    children:ReactNode;
}
const RegisterLayout : FC<IChildren> = ({children}) => {
  return (
    <div className='border border-amber-600 h-179.5 flex justify-between'>
      <div className=''> </div>
      <div>{children}</div>
    </div>
  )
}

export default RegisterLayout
