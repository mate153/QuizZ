import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"

const Login = ({setUser}) => {

    const navigate = useNavigate();

    const [backToMainMenu, setBackToMainMenu] = useState(false);
    const [userExist, setUserExist] = useState(true);
    const [hasAccount, setHasAccount] = useState(true);
    const [userData, setUserData] = useState({
        userName: "", 
        userEmail: "", 
        userPassword: "",
        userPassword2: ""
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;

    
        setUserData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }


    const handleSubmit = async (e) => {
        const url = "http://localhost:3001/api/handleUser";
        e.preventDefault();

        if(hasAccount) {
            fetch((url+"/login"), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: userData.userEmail,
                    userPassword: userData.userPassword
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.success && setUser(prev => prev = data.user)
                !data.success && setUserExist(prev => false)
            })
            .catch(error => console.error(error))
        }
        if(!hasAccount) {
            if(userData.userPassword === userData.userPassword2) {
                fetch((url+"/register"), {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userName: userData.userName,
                        userEmail: userData.userEmail,
                        userPassword: userData.userPassword
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.registrated) {
                        setHasAccount(true)
                    }
                })
                .catch(error => console.error(error))
            }
        }
    };
  
    const handlerBackToMainMenu = () => {
      setBackToMainMenu(true)
      setTimeout(() => {
        navigate(-1)
      }, 500)
    }

    return (
        <div className="windowContainer container">
            <AnimatePresence>
                <motion.div className="contentWindow" initial={{ scale: 0, opacity: 0}} animate={backToMainMenu ? {scale: 0} : {scale: 1, opacity:1}} transition={{duration: 0.5}}>
                    <button className="btn btn-x btn-light" onClick={handlerBackToMainMenu}><i className="bi bi-x-lg"></i></button>
                    {hasAccount ? 
                    (<form onSubmit={handleSubmit}>
                    <h1 className='optionHeader'>Login</h1>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label"><b>Email address</b></label>
                            <input type="email" required={true} onChange={handleInputChange} placeholder='john@gmail.com' name="userEmail" className="form-control" id="email" aria-describedby="emailHelp"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label"><b>Password</b></label>
                            <input type="password" required={true} minLength={8} onChange={handleInputChange} placeholder='password' name="userPassword" className="form-control" id="password"/>
                        </div>
                        {!userExist && <p className='reg-tag text-danger fw-bold'>Incorrect email or password!</p>}
                        <button type="submit" className={"btn btn-danger"}>Login</button>
                        <p className='reg-tag'>Dont have an account?&nbsp;<span onClick={() => setHasAccount(false)} className='reg-tag-a'>Register here</span></p>
                    </form>)
                    :
                    (<motion.form onSubmit={handleSubmit} initial={{opacity: 0, y: 100}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
                        <h1 className='optionHeader'>Register</h1>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label"><b>Username</b></label>
                                <input type="text" onChange={handleInputChange} minLength={3} required={true} placeholder='John' name="userName" className="form-control" id="username"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label"><b>Email address</b></label>
                                <input type="email" onChange={handleInputChange} required={true} placeholder='john@gmail.com' name="userEmail" className="form-control" id="email" aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label"><b>Password</b></label>
                                <input type="password" onChange={handleInputChange} minLength={8} required={true} placeholder='password' name="userPassword" className="form-control" id="password"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password2" className="form-label"><b>Confirm password</b></label>
                                <input type="password" onChange={handleInputChange} minLength={8} required={true} placeholder='password' name="userPassword2" className="form-control" id="password2"/>
                            </div>
                            <button type="submit" className={"btn btn-danger"}>Register</button>
                        </motion.form>)}
                    
                </motion.div>
            </AnimatePresence>
        </div>
        
    );
}
 
export default Login;