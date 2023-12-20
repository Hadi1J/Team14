
import "./post.css";
import logo from "./03.jpg";
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
  return (
    <div>
      <h2>Posts</h2>
      {loading && <p>Loading posts...</p>}
      {!loading && posts.length === 0 && <p>No posts available.</p>}
      {!loading && posts.length > 0 && (
        <div>
          {posts
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((post) => (
              <div className="post-card" key={post.id}>
                <div className="profile-info">
                  <img
                    alt="User profile picture"
                    className="profile-picture"
                    height={40}
                    src={post.isMyPost ? logo : post.profilePicture}
                    width={40}
                  />
                  <strong className="profile-name">{post.profilename}</strong>
                </div>
                <div className="post-content">
                  <strong>{post.text}</strong>
                  {post.photo && (
                    <img alt="Post" className="post-photo" src={post.photo} />
                  )}

                  <p className="post-timestamp">
                    {new Date(post.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
