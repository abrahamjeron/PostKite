import React, { useState } from 'react';
import axios from 'axios';

function UploadPost() {
    const [userName, setUserName] = useState('');
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [tags, setTags] = useState('');
    const [location, setLocation] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('file', file); // Use 'file' as the field name
        formData.append('caption', caption);
        formData.append('tags', tags);
        formData.append('location', location);

        try {
            const response = await axios.post('http://localhost:3000/posts/uploadpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert('Post uploaded successfully!');
        } catch (error) {
            console.error('Error uploading post:', error);
            alert('Error uploading post');
        }
    };

    return (
        <div>
            <h2>Upload Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User Name:</label>
                    <input 
                        type="text" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Post Image:</label>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                    />
                </div>
                <div>
                    <label>Caption:</label>
                    <input 
                        type="text" 
                        value={caption} 
                        onChange={(e) => setCaption(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Tags:</label>
                    <input 
                        type="text" 
                        value={tags} 
                        onChange={(e) => setTags(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                    />
                </div>
                <button type="submit">Upload Post</button>
            </form>
        </div>
    );
}

export default UploadPost;
