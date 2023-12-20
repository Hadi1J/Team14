import React, { useState, useEffect } from "react";
import Posts from "./Post";
import CreatePost from "./Createpost";
import { ref, onValue, push, set } from "firebase/database";
import { database } from "../firebase";

const PostManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsRef = ref(database, "posts");

    const fetchPosts = async () => {
      try {
        setLoading(true);

        onValue(postsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const postsArray = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));

            setPosts(postsArray);
          } else {
            setPosts([]);
          }

          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (postText) => {
    const postData = {
      text: postText,
      timestamp: Date.now(),
    };

    const postsRef = ref(database, "posts");
    const newPostRef = push(postsRef);

    try {
      await set(newPostRef, postData);
      console.log("Post created successfully!");
      setPosts((prevPosts) => [postData, ...prevPosts]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <CreatePost onCreatePost={handleCreatePost} />
      <Posts posts={posts} loading={loading} />
    </div>
  );
};

export default PostManager;
