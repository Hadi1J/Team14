/*import React, { useState } from 'react';
import PostManager from "./components/PostManager";
import GroupFeed from "./components/group";
import About from "./components/About";
import "./App.css";
import Navbar from "./components/Navbar";
import MainContent from './components/MainContent';


function App() {

  const [likeCount, setLikeCount] = useState(0);

    const addLike = () => {
        setLikeCount(likeCount + 1);
    };
  return (
    <div className="App">
    <Header><Navbar/><MainContent/></Header>
      <div className="container">
        <div className="row g-4">
          <GroupFeed />
        </div>
        <div className="row g-4">
          <div class="col-lg-8 vstack gap-4">
            <PostManager />
          </div>
          <div className="col-lg-4">
            <div className="Aboutgrid">
              <About />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;*/
import React, { useState } from "react";
import PostManager from "./components/PostManager";
import GroupFeed from "./components/group";
import About from "./components/About";
import "./App.css";
import Navbar from "./components/Navbar";
import MainContent from "./components/MainContent";

function App() {
  return (
<div className="App">
      <header></header>
      <div className="main">
        <div className="container">
          <div className="row g-4">
            <div class="col-md-8 col-lg-9 vstack gap-4">
              <GroupFeed />
            </div>
          </div>
          <div className="row g-4">
            <div class="col-lg-8 vstack gap-4">
              <PostManager />
            </div>
            <div className="col-lg-4">
              <About />
            </div>
          </div>
        </div>
      </div>
    </div>




  )
}

export default App;

