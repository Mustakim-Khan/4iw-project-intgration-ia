'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'

const AuthProvider = ({children }:any) => {
  return (
    <SessionProvider basePath="/api/auth">
        {children}
    </SessionProvider>
  )
}

export default AuthProvider;