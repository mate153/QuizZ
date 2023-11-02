import React, { useState, useEffect } from 'react'

export default function Quit() {
  const [theEnd, setTheEnd] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTheEnd(true)
    }, 8000)
  }, [])

  return (
    <div className="quitContainer">
      {
        theEnd ?
        <div className="theEndContainer"></div>
        : undefined
      }
      <span>We look forward to your return ! ☺</span>
    </div>
  )
}
