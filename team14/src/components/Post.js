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

      fetchCommentsForPost(selectedPostForComment);

      const commentsRef = ref(database, `comments/${selectedPostForComment}`);
      const newCommentKey = push(commentsRef).key;
      await set(child(commentsRef, newCommentKey), {
        id: newCommentKey,
        text: commentText,
      });

      setCommentText("");
      setSelectedPostForComment(null);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  /////////////////////////////////////////////////////////////////////////////////   { Reply Function }    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
        likesforReply: 5,
      });

      const updatedReplies = { ...replies };
      const commentReplies = Object.values(
        updatedReplies[selectedCommentForReply] || {}
      );
      commentReplies.push({
        id: newReplyKey,
        text: replyText,
        timestamp: timestamp,
      });
      updatedReplies[selectedCommentForReply] = commentReplies;

      setReplies(updatedReplies);

      setReplyText("");

      setSelectedCommentForReply(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  function ReplyTimeElapsed(ReplyDate) {
    var now = new Date();
    var currentTime = now.getTime();
    var secondsElapsed = Math.floor((currentTime - ReplyDate) / 1000);

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

  
  function Like({ likesforReply }) {
    const [Counter, Act] = useState(likesforReply);
  let k=likesforReply;
    const handleLikeClick = () => {
      Act((prevCounter) => ((prevCounter === 0 ? 1 : (prevCounter > k ? prevCounter - 1 : prevCounter + 1))
      ));
    };
    
  
    return (
      <div>
        <button id="like" onClick={handleLikeClick}>
           Like {Counter !== 0 && Counter}
        </button>
      </div>
    );
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
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

                  <div className="interaction-buttons">
                    <button onClick={() => handleLike(post.id)}>
                      Like ({interactionData[post.id]?.likes || 0})
                    </button>

                    <button onClick={() => handleComment(post.id)}>
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
                        <div key={comment.id} className="comment-card">
                          <div className="comment">
                            <strong className="CommentSection">
                              {comment.text}
                            </strong>
                            {/*/////////////////////////////////////////////////////////////////////////////////   { Reply Function }      \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}
                            <button
                              type="button"
                              id="replybutton"
                              onClick={() => handleReply(post.id, comment.id)}
                            >
                              Reply
                            </button>
                            <div className="ReplySection1"> </div>

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
                                      class="bi bi-caret-right-fill"
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
                                <div key={reply.id} className="reply-card">
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
                                      <div id="ProfileReply">
                                        <strong className="profile-name">
                                          {post.profilename}<div id="TimeE">
                                            {ReplyTimeElapsed(reply.timestamp)}
                                          </div>
                                          
                                        </strong>
                                      </div>

                                      <p className="DisplayforText">
                                        {reply.text}
                                      </p><div id="Activity">
                                    <Like likesforReply={reply.likesforReply} />
                                      <button id="REPLY"> Reply </button>
                                    </div>
                                    </div>
                                    
                                  </div>
                                </div>

                                /* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
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
