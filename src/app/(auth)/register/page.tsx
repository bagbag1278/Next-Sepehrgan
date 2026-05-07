import StepOneForm from '@/components/Auth/register/StepOneForm';
import GoogleLogin from '@/components/common/GooleLogin/GoogleLogin';
import React from 'react'

const RegisterPage = () => {
  return (
    <div dir='rtl'>
      <GoogleLogin/>
      <StepOneForm/>
    </div>
  )
}

export default RegisterPage;