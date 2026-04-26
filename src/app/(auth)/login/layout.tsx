import React, { FC, ReactNode } from 'react'
interface IChildren{
    children:ReactNode;
}
const LoginLayout : FC<IChildren> = ({children}) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

export default LoginLayout
