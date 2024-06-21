import React, { useEffect, useState } from "react";
import Navbar from "./navbars";
import "./homepage.css";
import Loading from "./loader"
import comments from "./assets/Comments.png";
import like from "./assets/Heart.png";
import chats from "./assets/Chats.png";

function Home() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false); 
    useEffect(() => {
        const fetchUsersDetails = async () => {
            setLoading(true)
            try {
                const usersDetails = await fetch(`https://postkite.onrender.com/users/userdata`);
                const result = await usersDetails.json();
                setUsers(result);
            } catch (err) {
                console.log(err);
            }finally{
                setLoading(false)
            }
        };

        fetchUsersDetails();
    }, []);

    useEffect(() => {
        const fetchUsersPosts = async () => {
            setLoading(true)
            try {
                const usersPosts = await fetch(`https://postkite.onrender.com/posts/allpost`);
                const result = await usersPosts.json();
                setPosts(result);
            } catch (err) {
                console.log(err);
            }finally{
                setLoading(false)
            }
        };

        fetchUsersPosts();
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredPosts = posts.filter(post =>
        post.userName.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        loading?<Loading /> :
        <div>
            <Navbar />
            <div className="header-line"></div>
            <div className="side-profiles">
                {users.map((user, index) => (
                    <div key={index} className="user-profiles">
                        <img className="profileimgs" src={`https://postkite.onrender.com/images/${user.profile}`} alt={`${user.userName}'s profile`} />
                        <p>{user.userName}</p>
                    </div>
                ))}
            </div>
            <div className="main-posts">
                <input
                    type="search"
                    placeholder="Search posts..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                    className="search-bar"
                />
                {filteredPosts.map((post, index) => (
                    <div key={index} className="post">
                        <div className="baground">
                            {users.map((user, idx) => (
                                user.userName === post.userName ? (
                                    <img key={idx} src={`https://postkite.onrender.com/images/${user.profile}`} alt={`${user.userName}'s profile`} className="post-profile-img" />
                                ) : null
                            ))}
                            <p className="top-username">{post.userName}</p>
                            <img src={`https://postkite.onrender.com/images/${post.postImage}`} alt="" className="post-image" />
                            <div className="post-details">
                                <div>
                                    <img src={like} alt="" /> 
                                    <p>15 likes</p>
                                </div>
                                <div>
                                    <img src={comments} alt="" />
                                    <p>75 comments</p>
                                </div>
                                <div>
                                    <img src={chats} alt="" />
                                    <p>message {post.userName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="divide-line">

                        </div>
                        <div className="about-post">
                            <div className="side-info">
                                <h1>About the post:</h1>
                                <div className="caption">
                                    <h3>Caption:</h3>
                                    <p>{post.caption}</p>
                                </div>
                            </div>
                            <div className="baground2">
                                <div className="loc-and-tag">
                                    <h5>Location:</h5>
                                    <p>{post.location}</p>
                                    <h5>Tags:</h5>
                                    <p>{post.tags}</p>
                                </div>
                                <div className="reactions">
                                    <h5>Reactions:</h5>
                                    <div>
                                        <img src={like} alt="" /> <p>15 likes</p>
                                    </div>
                                    <div>
                                        <img src={comments} alt="" />
                                        <p>75 comments</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
