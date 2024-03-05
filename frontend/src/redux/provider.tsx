import React from 'react'

import {store} from './store'
import {Provider as ReduxProvider} from 'react-redux'

interface ProviderProps {
    children: React.ReactNode | null | undefined | string| number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactPortal | JSX.Element | JSX.Element[] | JSX.Element | JSX.Element[] | null | undefined;
}


const Provider = ({children}: ProviderProps) => {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  )
}

export default Provider