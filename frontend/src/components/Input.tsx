import React from 'react'

type InputProps = {
    type: string
    name: string
    placeholder?: string
    state: string
    id: string
    setState: Function
}


const Input = ({type, name, placeholder, state, setState, id}: InputProps) => {
  return (
    <input id={id} type={type} name={name} placeholder={placeholder} value={state} onChange={(e: React.FormEvent<HTMLInputElement>) => setState(e.target?.value)}
     className="border border-gray-400 rounded-full w-full pl-2 py-1 focus:outline-indigo-400" />
  )
}

export default Input