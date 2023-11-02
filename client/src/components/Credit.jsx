import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState} from 'react'
import { motion, AnimatePresence } from "framer-motion"


export default function Credit() {

  const devs = [
    {name: "Norbert Kulcsár", githubLink: "https://github.com/kncode86"},
    {name: "Gábor Kolompár", githubLink: "https://github.com/McKay89"},
    {name: "Máté Szakasits", githubLink: "https://github.com/mate153"},
    {name: "Róbert Seres", githubLink: "https://github.com/Sxulles"}
  ]


  const navigate = useNavigate();

  const [backToMainMenu, setBackToMainMenu] = useState(false);

  const handlerBackToMainMenu = () => {
    setBackToMainMenu(true)
    setTimeout(() => {
      navigate(-1)
    }, 500)
  }

  return (
    <div className="windowContainer container" style={{filter : "hue-rotate(150deg)"}}>
      <AnimatePresence> {/* If the rendered element or component is gone stop and unmount animation*/}
        <motion.div className='container contentWindow' initial={{ scale: 0, opacity: 0}} animate={backToMainMenu ? {scale: 0} : {scale: 1, opacity:1}} transition={{duration: 0.5}}>
          <button className="btn btn-x btn-light" onClick={handlerBackToMainMenu}><i className="bi bi-x-lg"></i></button>
          <h1 className='optionHeader'>Credit</h1>
          <div className="row">
            {devs.map((dev,index) => (<div className="col" key={index}><h4 className='whitebox'>{dev.name}</h4></div>))}
          </div>
          <hr />
          <div className="row">
          {devs.map((dev,index) => (
          <div key={index} className="col">
            <AnimatePresence>
              <motion.a whileHover={{scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale: 0.9 }} href={dev.githubLink} target='_blank' className="btn btn-light">
                <i className="bi bi-github"/>&nbsp;Github profile
              </motion.a>
            </AnimatePresence>
          </div>))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
