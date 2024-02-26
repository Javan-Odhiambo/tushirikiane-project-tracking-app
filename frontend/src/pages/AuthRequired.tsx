import React, { useEffect } from 'react'
import { useUser } from '../../context/UserContext'

type AuthRequiredProps = {
    children: React.FC
}
// {children}: AuthRequiredProps
const AuthRequired = () => {
    const user = useUser()

    useEffect(() => {
        console.log(user)
    }, [])

  return (
    <>
        <div>User</div>
    </>
  )
}

export default AuthRequired