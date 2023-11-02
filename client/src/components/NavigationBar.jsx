import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"

const NavigationBar = ({user}) => {
    return (
            <nav className="navbar navbar-expand-lg navbar-warning bg-warning">
                <div className="container">
                    <img src="favicon.png" alt="" width="30" height="24" />
                    <AnimatePresence>
                    <Link className="navbar-brand mb-0 h1" to="/">&nbsp;Quiz Time</Link>
                    </AnimatePresence>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <AnimatePresence>
                                <motion.li whileHover={{scale: 1.2, backgroundColor: "rgb(255, 255, 255)", borderRadius: "40px"}} transition={{duration: 0.4}} className="nav-item">
                                    <Link className="nav-link" to={user === "" ? "/login" : "/profile"}>{user === "" ? "Login" : <><i className="fa-solid fa-user"></i><span> {user}</span></>}</Link>
                                </motion.li>
                            </AnimatePresence>
                        </ul>
                    </div>
                </div>
            </nav>
    );
}
 
export default NavigationBar;