import React, { useState } from "react";
import kite from "./assets/Kite.png"
import Kitecopy from "./assets/Kitecopy.png"
import cloud from "./assets/Cloud.png"
import Cookies from 'js-cookie';
import Loader from "./loader";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import "./register.css"
function Login(){
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate()
    const removeAllCookies = () => {
        const cookies = Cookies.get();
        for (const cookie in cookies) {
            Cookies.remove(cookie);
        }
    };
    // removeAllCookies()
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userData = await axios.get(`http://localhost:3000/auth/getuserbyUsername/${userName}`);
            const fetchedPassword = userData.data[0].password;
            console.log(fetchedPassword);
            if (fetchedPassword === password) {
                if (userData.status === 201) {
                    Cookies.set('userName', userName, { expires: 7 });
                    console.log(userData);
                    navigate('/signup');
                }
            } else {
                setTimeout(() => {
                    alert('incorrect password or username');
                }, 4000);
            }
        } catch (err) {
            console.log(err);
            setTimeout(() => {
                alert('incorrect password or username');
            }, 5000);
        } finally {
            setLoading(false);
        }
    };
    return(
        loading?<Loader/>:
        <>
            <h1 className="logo">PostKite<img src={kite} alt="" id="logo-image2" /> </h1>
            <div className="login-displays">
                <img src={Kitecopy} alt="" className="kite-image" />
                <div className="clouds">
                    <img src={cloud} alt="" className="cloud1"/>
                    <img src={cloud} alt="" className="cloud2" />
                    <img src={cloud} alt="" className="cloud3"/>
                </div>
            </div>
            <div className="form-container" onSubmit={handleLogin}>
                <form className="register-form" >
                    <h1 className="form-logo">PostKite <img src={kite} alt="" className="kite-logo1" /></h1>
                    <div className="input-field1">
                        <label>User Name:</label>
                        <br />
                        <input type="text" onChange={e=>setUserName(e.target.value)}/>
                    </div>
                    <div className="input-field2">
                        <label>Password:</label>
                        <br />
                        <input type="password" onChange={e=>setPassword(e.target.value)}/>
                    </div>
                    <p className="sigup-btn">Don't have an account? <Link to='/signup'>Sign up</Link> </p>
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <footer>
                <ul>
                    <li> <Link className="links">About us</Link> </li>
                    <li><Link className="links">Terms</Link></li>
                    <li><Link className="links">Support</Link></li>
                    <li><Link className="links">API</Link></li>
                </ul>
            </footer>
        </>
    )
}
export default Login;