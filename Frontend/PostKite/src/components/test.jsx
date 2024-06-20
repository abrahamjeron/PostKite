import React, { useState } from "react";
import axios from 'axios';

function Test() {
    const [user,setUser] = useState('');
    const [userName, setUserName] = useState('');
    const [file, setFile] = useState(null);
    const [bio, setBio] = useState('');
    const [banner, setBanner] = useState('');
    const [intrestedIn, setIntrestedIn] = useState('');
    const [Gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [followers, setFollowers] = useState('');
    const [following, setFollowing] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please enter a file.");
            return;
        }

        const formData = new FormData();
        formData.append('user', user);
        formData.append('file', file);
        formData.append('userName', userName);
        formData.append('bio', bio);
        formData.append('banner', banner);
        formData.append('intrestedIn', intrestedIn);
        formData.append('Gender', Gender);
        formData.append('age', age);
        formData.append('followers', followers);
        formData.append('following', following);

        axios.post("http://localhost:3000/users/uploadUser", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    return (
        <form onSubmit={uploadFile}>
            <div>
                <label>User:</label>
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
            </div>
            <div>
                <label>Username:</label>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div>
                <label>File:</label>
                <input type="file" onChange={handleFileChange} required />
            </div>
            <div>
                <label>Bio:</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />
            </div>
            <div>
                <label>Banner:</label>
                <input type="file" onChange={(e) => setBanner(e.target.value)} required />
            </div>
            <div>
                <label>Interested In:</label>
                <input type="text" value={intrestedIn} onChange={(e) => setIntrestedIn(e.target.value)} required />
            </div>
            <div>
                <label>Gender:</label>
                <input type="text" value={Gender} onChange={(e) => setGender(e.target.value)} required />
            </div>
            <div>
                <label>Age:</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
            </div>
            <div>
                <label>Followers:</label>
                <input type="number" value={followers} onChange={(e) => setFollowers(e.target.value)} required />
            </div>
            <div>
                <label>Following:</label>
                <input type="number" value={following} onChange={(e) => setFollowing(e.target.value)} required />
            </div>
            <button type="submit">Upload</button>
        </form>
    );
}

export default Test;

