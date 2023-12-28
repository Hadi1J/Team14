import "./post.css";
import logo from "./03.jpg";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Likereply from "./Reply/Likereply";
import ReplyTimeElapsed from "./Reply/ReplyTimeElapsed";
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
  var likeSection = document.createElement("div");
  const [replyText, setReplyText] = useState("");
  const [selectedCommentForReply, setSelectedCommentForReply] = useState(null);
  const [replies, setReplies] = useState({});

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
    const commentsRef = ref(database, `comments/${postId}`);

    try {
      const snapshot = await get(commentsRef);
      const data = snapshot.val();
      const postComments = Object.values(data || {});

      setComments((prevComments) => ({
        ...prevComments,
        [postId]: postComments,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    }

    setVisibleCommentCount(2);
  };

  const fetchRepliesForComment = async (postId, commentId) => {
    const database = getDatabase();
    const repliesRef = ref(database, `replies/${postId}/${commentId}`);

    try {
      const snapshot = await get(repliesRef);
      const data = snapshot.val();
      const commentReplies = Object.values(data || {});

      setReplies((prevReplies) => ({
        ...prevReplies,
        [commentId]: commentReplies,
      }));
    } catch (error) {
      console.error("Error fetching replies:", error);
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
  
        if (hoursElapsed < 24) {
          return hoursElapsed + " hour";
        } else {
          var daysElapsed = Math.floor(hoursElapsed / 24);
  
          if (daysElapsed < 7) {
            return daysElapsed + (daysElapsed === 1 ? " day" : " days");
          } else if (daysElapsed < 30) {
            var weeksElapsed = Math.floor(daysElapsed / 7);
            return weeksElapsed + (weeksElapsed === 1 ? " week" : " weeks");
          } else if (daysElapsed < 365) {
            var monthsElapsed = Math.floor(daysElapsed / 30);
            return monthsElapsed + (monthsElapsed === 1 ? " month" : " months");
          } else {
            var yearsElapsed = Math.floor(daysElapsed / 365);
            return yearsElapsed + (yearsElapsed === 1 ? " year" : " years");
          }
        }
      }
    }
  }
  
  const handleComment = (postId) => {
    setSelectedPostForComment(postId);
    setCommentText("");
    fetchCommentsForPost(postId);
  };

  const [loadedComments, setLoadedComments] = useState([]);
  const [visibleCommentCount, setVisibleCommentCount] = useState(2);

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

      fetchCommentsForPost(selectedPostForComment);

      const timestamp = Date.now();

      const commentsRef = ref(database, `comments/${selectedPostForComment}`);

      const newCommentKey = push(commentsRef).key;
      await set(child(commentsRef, newCommentKey), {
        id: newCommentKey,
        text: commentText,
        timestamp: timestamp,
        timestamp: timestamp,
      });

      setCommentText("");
      setSelectedPostForComment(null);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const Like = () => {
    const [Counter, Act] = useState(0);

    const handleLikeClick = () => {
      Act((prevCounter) => (prevCounter === 0 ? 1 : 0));
    };

    return (
      <div>
        <button className="likeComment" onClick={handleLikeClick}>
          {" "}
          Like {Counter > 0 && Counter}{" "}
        </button>
      </div>
    );
  };

  const handleReply = (postId, commentId) => {
    setSelectedCommentForReply(commentId);
    setReplyText("");
    fetchRepliesForComment(postId, commentId);
  };

  const handleReplySubmit = async () => {
    try {
      const database = getDatabase();
      const repliesRef = ref(
        database,
        `replies/${selectedPostForComment}/${selectedCommentForReply}`
      );
      const newReplyKey = push(repliesRef).key;

      const timestamp = Date.now(); // Add timestamp for the reply
      await set(child(repliesRef, newReplyKey), {
        id: newReplyKey,
        text: replyText,
        timestamp: timestamp,
        likesforReply: 0,
      });

      const updatedReplies = { ...replies };
      const commentReplies = Object.values(
        updatedReplies[selectedCommentForReply] || {}
      );
      commentReplies.push({
        id: newReplyKey,
        text: replyText,
        timestamp: timestamp,
        likesforReply: 0,
      });
      updatedReplies[selectedCommentForReply] = commentReplies;

      setReplies(updatedReplies);

      setReplyText("");

      setSelectedCommentForReply(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  function getTimeElapsedComment(commentTime) {
    var now = new Date();
    var currentTime = now.getTime();
    var secondsElapsed = Math.floor((currentTime - commentTime) / 1000);
  
    if (secondsElapsed < 60) {
      return secondsElapsed + " sec";
    } else {
      var minutesElapsed = Math.floor(secondsElapsed / 60);
      if (minutesElapsed < 60) {
        return minutesElapsed + " min";
      } else {
        var hoursElapsed = Math.floor(minutesElapsed / 60);
  
        if (hoursElapsed < 24) {
          return hoursElapsed + " hour";
        } else {
          var daysElapsed = Math.floor(hoursElapsed / 24);
  
          if (daysElapsed < 7) {
            return daysElapsed + (daysElapsed === 1 ? " day" : " days");
          } else if (daysElapsed < 30) {
            var weeksElapsed = Math.floor(daysElapsed / 7);
            return weeksElapsed + (weeksElapsed === 1 ? " week" : " weeks");
          } else if (daysElapsed < 365) {
            var monthsElapsed = Math.floor(daysElapsed / 30);
            return monthsElapsed + (monthsElapsed === 1 ? " month" : " months");
          } else {
            var yearsElapsed = Math.floor(daysElapsed / 365);
            return yearsElapsed + (yearsElapsed === 1 ? " year" : " years");
          }
        }
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
                        <a href="#">{getTimeElapsed(post.timestamp)}</a> {"."}
                        <i className="fa fa-globe" />
                      </div>
                    </div>
                    <div className="content">
                      <div className="post-content">
                        {post.text}
                        {post.photo && (
                          <img
                            alt="Post"
                            className="post-photo"
                            src={post.photo}
                          />
                        )}
                      </div>
                    </div>
                    <div className="social">
                      <div className="social-content" />
                      <div className="social-buttons">
                        <div className="interaction-buttons">
                          <button onClick={() => handleLike(post.id)}>
                            <i className="bi bi-hand-thumbs-up-fill pe-1"></i>
                            Like ({interactionData[post.id]?.likes || 0})
                          </button>
                          <button onClick={() => handleComment(post.id)}>
                            <i className="bi bi-chat-fill pe-1"></i>
                            Comment ({interactionData[post.id]?.comments || 0})
                          </button>
                          {selectedPostForComment === post.id && (
                            <>
                              <div className="typingcomment">
                                <img className="userphoto" src="1.jpg"></img>
                                <textarea
                                  className="commentcss"
                                  placeholder="Add a comment ..."
                                  value={commentText}
                                  onChange={(e) =>
                                    setCommentText(e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      handleCommentSubmit();
                                    }
                                  }}
                                />
                              </div>
                            </>
                          )}
                          <div className="post-comments">
                            {comments[post.id]
                              ?.slice(0, visibleCommentCount)
                              .map((comment) => (
                                <div
                                  key={comment.id}
                                  className="comment-container"
                                >
                                  <img
                                    className="userphoto"
                                    src="1.jpg"
                                    alt="User Photo"
                                  />
                                  <div className="commentarea">
                                    <p className="user-name">abdallah</p>
                                    <div className="timing">
                                      {getTimeElapsedComment(comment.timestamp)}
                                    </div>
                                    <p className="commentText">
                                      <strong>{comment.text}</strong>
                                    </p>
                                    <Like />

                                    <button
                                      type="button"
                                      id="replybutton"
                                      onClick={() =>
                                        handleReply(post.id, comment.id)
                                      }
                                    >
                                      Reply
                                    </button>
                                  </div>
                                  <div id="Replysection">
                                    {selectedCommentForReply === comment.id && (
                                      <>
                                        <div className="Replyy">
                                          <textarea
                                            id="textt"
                                            placeholder="Add a Reply ..."
                                            value={replyText}
                                            onChange={(e) =>
                                              setReplyText(e.target.value)
                                            }
                                          />
                                          <button
                                            className="POST"
                                            onClick={handleReplySubmit}
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="26"
                                              height="26"
                                              fill="currentColor"
                                              className="bi bi-caret-right-fill"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                            </svg>
                                          </button>
                                        </div>
                                      </>
                                    )}
                                    <div className="replies">
                                      {replies[comment.id]?.map((reply) => (
                                        <div
                                          key={reply.id}
                                          className="reply-card"
                                        >
                                          <div className="reply">
                                            <div className="PostedReplyy">
                                              <div className="ProfilePic">
                                                <img
                                                  alt="User profile picture"
                                                  className="profile-picture"
                                                  height={40}
                                                  src={
                                                    post.isMyPost
                                                      ? logo
                                                      : post.profilePicture
                                                  }
                                                  width={40}
                                                />
                                              </div>
                                            </div>
                                            <div id="ProfileReply">
                                              <strong className="profile-name">
                                                {post.profilename}
                                                <div id="TimeE">
                                                  {ReplyTimeElapsed(
                                                    reply.timestamp
                                                  )}
                                                </div>
                                              </strong>
                                            </div>
                                            <p className="DisplayforText">
                                              {reply.text}
                                            </p>
                                          </div>
                                          <div id="Activity">
                                            <Likereply
                                              likesforReply={
                                                reply.likesforReply
                                              }
                                            />
                                            <button id="REPLY"> Reply </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            <div className="lodemorecomments">
                              {comments[post.id] &&
                                visibleCommentCount <
                                  comments[post.id].length && (
                                  <button
                                    onClick={() =>
                                      setVisibleCommentCount(
                                        (oldCount) => oldCount + 2
                                      )
                                    }
                                  >
                                    ... Load More Comments
                                  </button>
                                )}
                            </div>
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
