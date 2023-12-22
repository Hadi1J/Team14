
import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  child,
  get,
} from "firebase/database";
import "./post.css";
import logo from "./03.jpg";

const Posts = ({ posts, loading }) => {
  const [commentText, setCommentText] = useState("");
  const [selectedPostForComment, setSelectedPostForComment] = useState(null);
  const [comments, setComments] = useState({});

  const fetchCommentsForPost = async (postId) => {
    const database = getDatabase();
    const commentsRef = ref(database, "comments");
    try {
      const snapshot = await get(commentsRef);
      const data = snapshot.val();
      const postComments = Object.values(data || {}).filter(
        (comment) => comment.postId === postId
      );

      setComments((prevComments) => ({
        ...prevComments,
        [postId]: postComments,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleComment = (postId) => {
    setSelectedPostForComment(postId);
    setCommentText("");
    fetchCommentsForPost(postId);
  };

  function getTimeElapsed(postTime) {
    var now = new Date();
    var currentTime = now.getTime();
    var secondsElapsed = Math.floor((currentTime - postTime) / 1000);

    if (secondsElapsed < 60) {
        return secondsElapsed + " sec";
    } else {
        var minutesElapsed = Math.floor(secondsElapsed / 60);
        if (minutesElapsed < 60) {
            return minutesElapsed + " min";
        } else {
            var hoursElapsed = Math.floor(minutesElapsed / 60);
            return hoursElapsed + " hour";
        }
    }
}


  return (
    <div>
      {loading && <p>Loading posts...</p>}
      {!loading && posts.length === 0 && <p>No posts available.</p>}
      {!loading && posts.length > 0 && (
        <div>
          {posts
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((post) => (
              <div className="post-card" key={post.id}>
    
                <div className="f-card">
                  <div className="header">
                    <img
                      className="co-logo"
                      src={post.isMyPost ? logo : post.profilePicture}
                    />
                    <div className="co-name">
                      <a href="#">{post.profilename}</a>
                    </div>
                    <div className="time">
                      <a href="#">
                        {getTimeElapsed(post.timestamp)}
                      </a>{" "}
                      · <i className="fa fa-globe" />
                    </div>
                  </div>
                  <div className="content">
                    <p>{post.text}</p>
                    {post.photo && (
                    <img alt="Post" className="post-photo" src={post.photo} />)}
                  </div>
                  <div className="social">
                    <div className="social-content" />
                    <div className="social-buttons">
                      <span>
                        <i className="fa fa-thumbs-up" />Like
                      </span>
                      <span onClick={() => handleComment(post.id)}>
                        <i className="fa fa-comment" />Comment
                      </span>

                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Posts;

