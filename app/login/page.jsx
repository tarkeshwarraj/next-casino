'use client'
import React, { Suspense } from 'react'
import LoginPage from './loginform/LoginForm'

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage/>
    </Suspense>
  )
}

export default page