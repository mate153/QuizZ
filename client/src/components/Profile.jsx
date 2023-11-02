import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"

const fetchUserInfo = (username) => {
    fetch(`http://localhost:3001/api/actualUser/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers you need
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the data returned from the API
        console.log(data);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
}


export default function Profile({user}) {

  const navigate = useNavigate();

  const [backToMainMenu, setBackToMainMenu] = useState(false);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    console.log(user);
    fetchUserInfo(user)
  }, [user])


  const handleEdit = () => {
    setEditable(!editable);
  }

  const handlerBackToMainMenu = () => {
    setBackToMainMenu(true)
    setTimeout(() => {
      navigate(-1)
    }, 500)
  }

  const handleSubmit = (e) => {
    e.preventDeafult()
  }

  return (
    <div className="windowContainer container" style={{filter : "hue-rotate(320deg)"}}>
      <AnimatePresence> {/* If the rendered element or component is gone stop and unmount animation*/}
        <motion.div className='container contentWindow' initial={{ scale: 0, opacity: 0}} animate={backToMainMenu ? {scale: 0} : {scale: 1, opacity:1}} transition={{duration: 0.5}}>
        <button className="btn btn-x btn-light" onClick={handlerBackToMainMenu}><i className="bi bi-x-lg"></i></button>
        <h1 className='optionHeader'>Profile</h1>

        <form onSubmit={handleSubmit} className="container">
          <label htmlFor="userEmail" className='form-label'><b>Email address</b></label>
          <div className="input-group">
            <div className="input-group-prepend">
              <input type="email" className="form-control" id="userEmail" disabled={!editable} defaultValue="email" aria-describedby="inputGroupPrepend" required />
            </div>
              <span onClick={handleEdit} className="input-group-text btn btn-dark"><i className="bi bi-pencil-square"></i></span>
          </div>
          <label htmlFor="userName" className='form-label'><b>Username</b></label>
          <div className="input-group">
            <div className="input-group-prepend">
              <input type="text" className="form-control" id="userName" disabled={editable ? false : true} defaultValue="username" aria-describedby="inputGroupPrepend" required />
            </div>
              <span onClick={handleEdit} className="input-group-text btn btn-dark"><i className="bi bi-pencil-square"></i></span>
          </div>
        </form>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
