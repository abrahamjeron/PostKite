import React, { useState } from "react";
import kite from "./assets/Kite.png";
import Kitecopy from "./assets/Kitecopy.png";
import cloud from "./assets/Cloud.png";
import Loader from "./loader";
import { Link , useNavigate} from "react-router-dom";
import "./register.css";
import axios from "axios";

function Register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading,setLoading]=useState(false)
    const navigate = useNavigate()
    const handleSignup = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setLoading(true)
            try {
                const userData = await axios.post(`https://postkite.onrender.com/auth/authUser`, { userName, password });
                console.log(`User successfully registered: ${userData.data}`);
                navigate('/')
            } catch (err) {
                console.error(err);
            } finally{
                setLoading(false)
            }
        } else {
            alert('Passwords do not match');
        }
    }
    return (
        loading?<Loader/>:
        <>
            <h1 className="logo">PostKite <img src={kite} alt="Kite" id="logo-image2" /></h1>
            <div className="login-displays">
                <img src={Kitecopy} alt="Kite Copy" className="kite-image" />
                <div className="clouds">
                    <img src={cloud} alt="Cloud" className="cloud1" />
                    <img src={cloud} alt="Cloud" className="cloud2" />
                    <img src={cloud} alt="Cloud" className="cloud3" />
                </div>
            </div>
            <div className="form-container">
                <form className="register-form" onSubmit={handleSignup}>
                    <h1 className="form-logo">PostKite <img src={kite} alt="Kite" className="kite-logo1" /></h1>
                    <div className="input-field1">
                        <label>User Name:</label>
                        <br />
                        <input type="text" onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div className="input-field2">
                        <label>Password:</label>
                        <br />
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="input-field3">
                        <label>Confirm Password:</label>
                        <br />
                        <input type="password" onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <p className="signup-btn2">Already a user? <Link to='/'>Sign in</Link></p>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            {loading ? <Loader /> : ""} 
            <footer>
                <ul>
                    <li><Link className="links">About us</Link></li>
                    <li><Link className="links">Terms</Link></li>
                    <li><Link className="links">Support</Link></li>
                    <li><Link className="links">API</Link></li>
                </ul>
            </footer>
        </>
    );
}

export default Register;
