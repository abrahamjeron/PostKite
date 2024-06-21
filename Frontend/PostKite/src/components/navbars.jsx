import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kite from "./assets/Kite.png";
import home from "./assets/Home.png";
import search from "./assets/Search.png";
import add from "./assets/Add.png";
import chat from "./assets/Chat.png";
import settings from './assets/Settings.png';
import profile from "./assets/defaultProfile.webp";
import logout from './assets/Logout.png';
import Cookies from 'js-cookie';
import "./navbars.css"
function Navbar(){
    const [kiteUser,setKiteUser]= useState([]);
    const [userProfile,setUserProfile]=useState('');
    const [userName,setUserName] = useState('');
    const Navigate = useNavigate()

    useEffect(() => {
        const fetchUsername = () => {
            const user = Cookies.get('userName');
            if (user) {
                setUserName(user);
                console.log('Username fetched from cookies:', user);
            } else {
                console.log('User not found in cookies');
            }
        };
        fetchUsername();
    }, []);


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`https://postkite.onrender.com/users/user/${userName}`);
                console.log('Response Status:', response.status);
    
                if (!response.ok) {
                    const errorMessage = `Error: ${response.status} ${response.statusText}`;
                    throw new Error(errorMessage);
                }
    
                const result = await response.json();
    
                setKiteUser(result.userName);
                setUserProfile(result.profile)
                console.log(result);
    
            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        };
    
        fetchUserDetails();
    }, [userName]);

    const gotprofile=(e)=>{
        Navigate('/profile')
    }
    const removeAllCookies = () => {
        const cookies = Cookies.get();
        for (const cookie in cookies) {
            Cookies.remove(cookie);
        }
    };
    return(
        <>
            <h1 className="logo">PostKite<img src={kite} alt="" id="logo-image2" /> </h1>
            <div className="main-navs">
                <div
                    className="topnavs"
                >
                    <ul className="main-icons1" >
                        <li>
                                <img src={home} alt="Home" />
                        </li>
                        <li>
                            <img src={search} alt="Search" />
                        </li>
                        <li>
                            <img src={add} alt="Add" />
                        </li>
                        <li>
                            <img src={chat} alt="Chat" />
                        </li>
                        <li>
                            <img src={`https://postkite.onrender.com/images/${userProfile}`} alt="Profile" onClick={gotprofile}/>
                        </li>
                    </ul>
                    <ul className="icons3">
                        <li>
                            <img src={settings} alt="Settings" />
                        </li>
                        <li>
                            <img src={logout} alt="Logout" onClick={removeAllCookies}/>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Navbar;