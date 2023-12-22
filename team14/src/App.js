import PostManager from "./components/PostManager";
import GroupFeed from "./components/group";
import About from "./components/About";
import "./App.css";

function App() {
  return (
    <div className="App">
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

export default App;
