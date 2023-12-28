import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { database } from "../firebase";
import "./Createpost.css";
import logo from "./03.jpg";

const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const staticProfileName = "Ahmed sheqo";
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      text: postText,
      timestamp: Date.now(),
      isMyPost: true,
      profilePicture: logo,
      profilename: staticProfileName,
    };
    const postsRef = ref(database, "posts");
    const newPostRef = push(postsRef);
    try {
      await set(newPostRef, postData);
      console.log("Post created successfully!");
      setPostText("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <div className="container big create-post-div">
      <div className="post-box d-flex flex-column">
        <div className="d-flex align-items-center">
          <img
            alt="User profile picture"
            className="user-image"
            height={40}
            src={logo}
            width={40}
          />
          <textarea
            className="post-input flex-grow-1"
            placeholder="Share your thoughts..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <hr />
        <div className="action-buttons d-flex justify-content-start">
          <button className="btn">
            <i className="bi bi-image-fill"></i>
            Photo
          </button>
          <button className="btn">
            <i className="bi bi-camera-reels-fill"></i>
            Video
          </button>
          <button className="btn">
            <i className="bi bi-calendar2-event-fill"></i>
            Event
          </button>
          <button className="btn">
            <i className="fas fa-smile"></i>
            Feeling / Activity
          </button>
          <button
            type="submit"
            onClick={handlePostSubmit}
            className="post-button"
            disabled={!postText.trim()}
          >
            POST
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
