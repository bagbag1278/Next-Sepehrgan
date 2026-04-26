import React, { FC, ReactNode } from 'react'
interface IChildren{
    children:ReactNode;
}
const RegisterLayout : FC<IChildren> = ({children}) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

export default RegisterLayout
