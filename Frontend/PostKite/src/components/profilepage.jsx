import React, { useEffect, useState } from "react";
import kite from "./assets/Kite.png";
import home from "./assets/Home.png";
import search from "./assets/Search.png";
import add from "./assets/Add.png";
import chat from "./assets/Chat.png";
import settings from './assets/Settings.png';
import profile from "./assets/defaultProfile.webp";
import logout from './assets/Logout.png';
import banner from './assets/banner.png';
import sample from './assets/sample.jpeg';
import me from './assets/me.png';
import edit from "./assets/edit.png";
import "./profilepage.css";
import Cookies from 'js-cookie';

function Profile() {
    const [hover, setHover] = useState(false);
    const [kites, setKites] = useState([]);
    const [userName, setUserName] = useState('');
    const [kite_user, setKiteUser] = useState('');
    const [kiteUserName, setKiteUserName] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const [userBanner, setUserBanner] = useState('');
    const [userBio, setUserBio] = useState('');
    const [userFollowers, setUserFollowers] = useState('');
    const [userFollowing, setUserFollowing] = useState('');
    const [userIntrest, setUserIntrest] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    const handleMouseOver = () => {
        if (!isMobile) {
            setHover(true);
        }
    };

    const handleMouseOut = () => {
        if (!isMobile) {
            setHover(false);
        }
    };

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
        const fetchKites = async () => {
            try {
                if (!userName) return; // Exit early if userName is not set
                const response = await fetch(`http://localhost:3000/posts/userKite/${userName}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                setKites(result);
                console.log(result);
            } catch (error) {
                console.error('Fetch error:', error.message);
            }
        };

        fetchKites();
    }, [userName]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await fetch(`http://localhost:3000/users/user/Abraham`);
                if (!userDetails.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const result = await userDetails.json();
                setKiteUser(result.userName);
                console.log(result);

                setKiteUserName(result.user);
                setUserProfile(result.profile);
                setUserBanner(result.banner);
                setUserBio(result.bio);
                setUserFollowers(result.followers);
                setUserFollowing(result.following);
                setUserIntrest(result.intrestedIn);

            } catch (err) {
                console.log(err);
            }
        };

        fetchUserDetails();
    }, []); // Dependency array indicates when to re-run the effect

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <img src={kite} alt="Kite" id="logo-image3" />
            <div className="navs">
                <div
                    className="sidevnavs"
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    style={{ width: isMobile ? "300px" : (hover ? "200px" : "100px") }}
                >
                    <ul className="icons" style={{ marginLeft: hover && !isMobile ? "-175px" : "-50px" }}>
                        <li>
                            {hover && !isMobile ? (
                                <div>
                                    <img src={home} alt="Home" /> <p className="descriptions">Home</p>
                                </div>
                            ) : (
                                <img src={home} alt="Home" />
                            )}
                        </li>
                        <li>
                            {hover && !isMobile ? (
                                <div>
                                    <img src={search} alt="Search" />
                                    <p className="descriptions">Search</p>
                                </div>
                            ) : (
                                <img src={search} alt="Search" />
                            )}
                        </li>
                        <li>
                            {hover && !isMobile ? (
                                <div>
                                    <img src={add} alt="Add" /> <p className="descriptions">Fly New Kite</p>
                                </div>
                            ) : (
                                <img src={add} alt="Add" />
                            )}
                        </li>
                        <li>
                            {hover && !isMobile ? (
                                <div>
                                    <img src={chat} alt="Chat" /> <p className="descriptions">Chats</p>
                                </div>
                            ) : (
                                <img src={chat} alt="Chat" />
                            )}
                        </li>
                        <li>
                            {hover && !isMobile ? (
                                <div>
                                    <img src={profile} alt="Profile" />
                                    <p className="descriptions">Profile</p>
                                </div>
                            ) : (
                                <img src={profile} alt="Profile" />
                            )}
                        </li>
                    </ul>
                    <ul className="icons2" style={{ marginLeft: hover && !isMobile ? "-175px" : "-50px" }}>
                        <li>
                            {hover && !isMobile ? (
                                <div>
                                    <img src={settings} alt="Settings" />
                                    <p className="descriptions">Settings</p>
                                </div>
                            ) : (
                                <img src={settings} alt="Settings" />
                            )}
                        </li>
                        <li>
                            {hover && !isMobile ? (
                                <div>
                                    <img src={logout} alt="Logout" />
                                    <p className="descriptions">Logout</p>
                                </div>
                            ) : (
                                <img src={logout} alt="Logout" />
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main">
                <div className="banner" style={{ marginLeft: hover && !isMobile ? "270px" : "120px" }}>
                    <img src={`http://localhost:3000/images/${userBanner}`} className="bannerimg" alt="Banner" />
                    <div className="profile" style={{ right: isMobile? "250px": (hover?"800px" : "1000px") }}>
                        <img src={`http://localhost:3000/images/${userProfile}`} className="profileimg" alt="Profile" />
                    </div>
                </div>
            </div>
            <div className="details">
                <div className="name">
                    <h3>{kite_user}</h3>
                    <button>
                        <img src={edit} alt="Edit" />
                    </button>
                    <h4>I'm Interested in:</h4>
                    <p>{userIntrest}</p>
                    <li className="followdetails">
                        <h6>18 Kites</h6>
                        <h6>{userFollowers} Followers</h6>
                        <h6>{userFollowing} Following</h6>
                    </li>
                </div>
                <div className="line"></div>
                <div className="bios">
                    <h4>About me:</h4>
                    <p>
                        {userBio}
                    </p>
                </div>
            </div>
            <h4 className="username">Abra's Kites:</h4>
            <div className="kites-grid">
                {kites.length > 0 ? (
                    kites.map((kite, index) => (
                        <div key={index} className="kite">
                            <img src={`http://localhost:3000/images/${kite.postImage}`} alt={`Kite ${index}`} />
                        </div>
                    ))
                ) : (
                    <p>No kites found</p>
                )}
            </div>
        </div>
    );
}

export default Profile;