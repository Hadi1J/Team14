
  
import React, { useState} from "react";

function Likereply({ likesforReply }) {
    const [Counter, setact] = useState(likesforReply);
    let k = likesforReply;
    const handleLikeClick = () => {
       
      setact((prevCounter) =>
        prevCounter === 0 ? 1
          : prevCounter > k
          ? prevCounter - 1
          : prevCounter + 1
      );
    };

    return (
        <div>
          <button id="like" onClick={handleLikeClick}>
            Like {Counter !== 0 && Counter}
          </button>
        </div>
      );
}

export default Likereply;