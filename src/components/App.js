import React, { useState } from "react";
import videoData from "../data/video.js";

function App() {
  const [video, setVideo] = useState(videoData);
  const [showComments, setShowComments] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpvote = () => {
    setVideo((prevVideo) => ({
      ...prevVideo,
      upvotes: prevVideo.upvotes + 1,
    }));
  };

  const handleDownvote = () => {
    setVideo((prevVideo) => ({
      ...prevVideo,
      downvotes: prevVideo.downvotes + 1,
    }));
  };

  const toggleComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  const handleCommentUpvote = (commentId) => {
    setVideo((prevVideo) => ({
      ...prevVideo,
      comments: prevVideo.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, upvotes: comment.upvotes + 1 }
          : comment
      ),
    }));
  };

  const handleCommentDownvote = (commentId) => {
    setVideo((prevVideo) => ({
      ...prevVideo,
      comments: prevVideo.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, downvotes: comment.downvotes + 1 }
          : comment
      ),
    }));
  };

  const handleRemoveComment = (commentId) => {
    setVideo((prevVideo) => ({
      ...prevVideo,
      comments: prevVideo.comments.filter((comment) => comment.id !== commentId),
    }));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredComments = video.comments.filter((comment) =>
    comment.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = () => {
    setVideo((prevVideo) => ({
      ...prevVideo,
      comments: [...video.comments].sort((a, b) => a.user.localeCompare(b.user)),
    }));
  };

  return (
    <div className="App" style={{marginTop: "20px"}}>
      <div>
        <iframe
          width="919"
          height="525"
          src={video.embedUrl}
          frameBorder="0"
          allowFullScreen
          title="Video Player"
        />
      </div>
      <div>
        <h2>{video.title}</h2>
        <p>{video.views} Views | Uploaded {video.createdAt}</p>
        <button onClick={handleUpvote}>{video.upvotes}👍</button>
        <button onClick={handleDownvote}>{video.downvotes}👎</button>
      </div>
      <br/>
      <div>
        <button onClick={toggleComments} style={{marginBottom: "20px"}}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        {showComments && (
          <div style={{marginBottom: "20px"}}>
            <hr style={{width:"70%"}}/>
            <h3>{filteredComments.length} Comments</h3>
            <input
              type="text"
              placeholder="Search comments by username"
              style={{width:"15%"}}
              value={searchTerm}
              onChange={handleSearch}
            />
            <button onClick={handleSort}>Sort by Username</button>
            {filteredComments.map((comment) => (
              <div key={comment.id}>
                <h4>{comment.user}</h4>
                <p>{comment.comment}</p>
                  <button onClick={() => handleCommentUpvote(comment.id)}>
                  {comment.upvotes}👍
                  </button>
                  <button onClick={() => handleCommentDownvote(comment.id)}>
                  {comment.downvotes}👎
                  </button>
                  <button onClick={() => handleRemoveComment(comment.id)}>
                    Remove Comment
                  </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;




// import video from "../data/video.js";

// function App() {
//   console.log("Here's your data:", video);

//   return (
//     <div className="App">
//       <iframe
//         width="919"
//         height="525"
//         src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//         frameBorder="0"
//         allowFullScreen
//         title="Thinking in React"
//       />
//     </div>
//   );
// }

// export default App;
