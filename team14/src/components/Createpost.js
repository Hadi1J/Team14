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
    <div className="container">
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
            placeholder="Write your post..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <hr />
        <div className="action-buttons d-flex justify-content-start">
          <button className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-image-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
            </svg>
            <i className="bi bi-image-fill"></i>
            Photo
          </button>
          <button className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-camera-reels-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
            </svg>
            <i className="bi bi-camera-reels-fill"></i>
            Video
          </button>
          <button className="btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-calendar2-event-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5m9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5M11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
            </svg>
            <i className="bi bi-calendar2-event-fill"></i>
            Event
          </button>
          <button className="btn">
            <i className="fas fa-smile"></i>
            Feeling / Activity
          </button>
        </div>
        <div className="sharepost">
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