import React, { useState } from 'react';
import PostManager from "./components/PostManager";
import Navbar from "./components/Navbar";


import MainContent from './components/MainContent';

function App() {

  const [likeCount, setLikeCount] = useState(0);

    const addLike = () => {
        setLikeCount(likeCount + 1);
    };
  return (
    <div className="App">
      <Navbar/>
      <PostManager/>
      <MainContent>
            </MainContent>
      
    </div>
  );
}

export default App;
