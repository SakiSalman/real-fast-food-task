import React, { ReactNode } from 'react'
import { AppContextProvider } from '@/context/appContext'

type Props = {
    children : ReactNode
}

const Providers = ({children}: Props) => {
  return (
    <AppContextProvider>
        {children}
    </AppContextProvider>
  )
}

export default Providers