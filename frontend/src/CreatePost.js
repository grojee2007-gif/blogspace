import { useState } from "react";
import axios from "axios";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitPost = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/posts",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post Created");

      setTitle("");
      setContent("");

      window.location.href = "/";

    } catch (error) {
      if (error.response?.status === 401) {
        alert("Please Login First");
      } else {
        alert("Error creating post");
      }
    }
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "40px auto",
      }}
    >
      <h2>Create Post</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "15px",
        }}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          height: "150px",
          padding: "15px",
        }}
      />

      <button
        onClick={submitPost}
        style={{
          marginTop: "15px",
          padding: "12px 20px",
        }}
      >
        Publish
      </button>
    </div>
  );
}

export default CreatePost;