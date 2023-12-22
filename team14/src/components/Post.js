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
  const [interactionData, setInteractionData] = useState({});

  const [commentText, setCommentText] = useState("");
  const [selectedPostForComment, setSelectedPostForComment] = useState(null);
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchInteractionData = async () => {
      const database = getDatabase();
      const interactionsRef = ref(database, "interactions");

      try {
        onValue(interactionsRef, (snapshot) => {
          const data = snapshot.val();
          setInteractionData(data || {});
        });
      } catch (error) {
        console.error("Error fetching interaction data:", error);
      }
    };

    fetchInteractionData();
  }, []);

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

  const handleLike = (postId) => {
    const database = getDatabase();
    const interactionsRef = ref(database, "interactions");

    try {
      const postInteractionRef = child(interactionsRef, postId);
      const currentLikes = interactionData[postId]?.likes || 0;
      const currentComments = interactionData[postId]?.comments || 0;
      const userHasLiked = interactionData[postId]?.likedByUser || false;

      if (userHasLiked) {
        set(postInteractionRef, {
          likes: currentLikes - 1,
          comments: currentComments,
          likedByUser: false,
        });
        setInteractionData((prevData) => ({
          ...prevData,
          [postId]: {
            ...prevData[postId],
            likes: currentLikes - 1,
            likedByUser: false,
          },
        }));
      } else {
        set(postInteractionRef, {
          likes: currentLikes + 1,
          comments: currentComments,
          likedByUser: true,
        });
        setInteractionData((prevData) => ({
          ...prevData,
          [postId]: {
            ...prevData[postId],
            likes: currentLikes + 1,
            likedByUser: true,
          },
        }));
      }
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const handleComment = (postId) => {
    setSelectedPostForComment(postId);
    setCommentText("");
    fetchCommentsForPost(postId);
  };

  const handleCommentSubmit = async () => {
    try {
      const database = getDatabase();
      const interactionsRef = ref(database, "interactions");
      const postInteractionRef = child(interactionsRef, selectedPostForComment);

      const currentComments =
        interactionData[selectedPostForComment]?.comments || 0;
      const currentLikes = interactionData[selectedPostForComment]?.likes || 0;

      await set(postInteractionRef, {
        comments: currentComments + 1,
        likes: currentLikes,
      });

      setInteractionData((prevData) => ({
        ...prevData,
        [selectedPostForComment]: {
          ...prevData[selectedPostForComment],
          comments: currentComments + 1,
        },
      }));

      // Fetch comments again after submitting a new comment
      fetchCommentsForPost(selectedPostForComment);

      const commentsRef = ref(database, "comments");
      const newCommentKey = push(commentsRef).key;
      await set(child(commentsRef, newCommentKey), {
        postId: selectedPostForComment,
        text: commentText,
      });

      setCommentText("");
      setSelectedPostForComment(null);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
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
              <div className="profile-info">
                <div className="f-card">
                  <div className="header">
                    <img
                      alt="User profile picture"
                      className="profile-picture co-logo"
                      height={40}
                      src={post.isMyPost ? logo : post.profilePicture}
                      width={40}
                    />
                    <div className="co-name">
                      <strong className="">{post.profilename}</strong>
                    </div>
                    <div className="time">
                      <a href="#">
                        {getTimeElapsed(post.timestamp)}
                      </a>{" "}
                      · <i className="fa fa-globe" />
                    </div>
                  </div>                  
                  <div className="content">
                    <div className="post-content">
                      <strong>{post.text}</strong>
                      {post.photo && (
                        <img alt="Post" className="post-photo" src={post.photo} />
                      )}
                    </div>

                  </div>
                  <div className="social">
                    <div className="social-content" />
                    <div className="social-buttons">
                      <div className="interaction-buttons">
                        <button  onClick={() => handleLike(post.id)}>
                          <i class="bi bi-hand-thumbs-up-fill pe-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                              <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                          </svg>
                          </i>
                          Like ({interactionData[post.id]?.likes || 0})
                        </button>
                        <button onClick={() => handleComment(post.id)}>
                          <i class="bi bi-chat-fill pe-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-fill" viewBox="0 0 16 16">
                              <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15"/>
                          </svg>
                          </i>
                          Comment ({interactionData[post.id]?.comments || 0})
                        </button>
                        {selectedPostForComment === post.id && (
                          <>
                            <textarea
                              placeholder="Type your comment..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button onClick={handleCommentSubmit}>
                              Submit Comment
                            </button>
                          </>
                        )}
                        <div className="post-comments">
                          {comments[post.id]?.map((comment) => (
                            <div key={comment.id} className="comment">
                              <strong>{comment.text}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
