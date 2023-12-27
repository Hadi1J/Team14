import React from "react";
import PostManager from "./components/PostManager";
import Group from "./components/Group/Group";
import About from "./components/About/About";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <div className="container">
          <div className="row g-4">
            <div class="col-md-8 col-lg-9 vstack gap-4">
              <Group />
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
  );
}

export default App;