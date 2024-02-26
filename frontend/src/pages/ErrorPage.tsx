import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage: React.FC = () => {
    const error:any = useRouteError();
    console.log(error);
  return (
    <div>{ error.status } {error.statusText}</div>
  )
}

export default ErrorPage