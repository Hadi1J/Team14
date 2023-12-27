
import Posts from "./Post";
import { getDatabase } from "firebase/database";

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
        return hoursElapsed + " hour";
      }
    }
  }
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
