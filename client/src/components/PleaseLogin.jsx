import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PleaseLogin() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
        navigate("/")
    }, 3000)
  }, [])

  return (
    <div className='pleaseLoginContainer'>
        <span>Please Log In to <b>Play()</b></span>
    </div>
  )
}
