import React, { useState, useEffect } from "react";
import './setuppage.css';
import kite from "./assets/Kite.png";
import profile from "./assets/defaultProfile.webp";
import Loader from "./loader";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";

function Setup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [file, setFile] = useState(null);
    const [bio, setBio] = useState('');
    const [interestedIn, setInterestedIn] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const users = Cookies.get('userName');
        setUser(users);
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async (e) => {
        e.preventDefault();
    
        if (!file) {
            alert("Please enter a file.");
            return;
        }
    
        const formData = new FormData();
        formData.append('user', user);
        const userName = `${firstName}_${lastName}`;
        formData.append('file', file);
        formData.append('userName', userName);
        formData.append('bio', bio);
        formData.append('interestedIn', interestedIn);
        formData.append('gender', gender);
        formData.append('age', age);
        formData.append('followers', followers);
        formData.append('following', following);
        setLoading(true);
        
        try {
            const res = await axios.post("http://localhost:3000/users/uploadUser", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/');
            console.log(res);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? <Loader /> :
        <div>
            <h1 className="logo">PostKite<img src={kite} alt="PostKite Logo" id="logo-image2" /></h1>
            <form className="setupform" onSubmit={uploadFile}>
                <div>
                    <h1 className="setup-msg">Let’s setup your profile!</h1>
                    <label className="profile-label">Profile photo:</label>
                    <div className="profile-photo">
                        <img src={file ? URL.createObjectURL(file) : profile} alt="Profile" className="default-profile-photo" />
                    </div>
                    <input type="file" className="profile-input" onChange={handleFileChange} required />
                    
                    <label className="bio-label">Bio: </label>
                    <textarea className="bio" name="bio" rows="4" cols="45" value={bio} onChange={(e) => setBio(e.target.value)} required></textarea>
                </div>
                <div className="parent">
                    <div className="vertical-line"></div>
                </div>
                <div className="text-form">
                    <label className="labels">First Name:</label>
                    <input className="text-inputs" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    <label className="labels">Last Name:</label>
                    <input className="text-inputs" type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    <label className="labels">Interested in:</label>
                    <input className="text-inputs" type="text" value={interestedIn} onChange={e => setInterestedIn(e.target.value)} required />
                    <label className="labels">Gender:</label>
                    <input className="text-inputs" type="text" value={gender} onChange={e => setGender(e.target.value)} required />
                    <label className="labels">Age:</label>
                    <input className="text-inputs" type="text" value={age} onChange={e => setAge(e.target.value)} required />
                </div>
                <button type="submit" className="finish-setup-btn">Finish Setup</button>
            </form>
        </div>
    );
}

export default Setup;
