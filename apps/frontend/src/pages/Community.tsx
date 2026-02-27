import { useState, useEffect } from "react";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [sortMode, setSortMode] = useState("newest");

  // Form fields
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [googlePlayLink, setGooglePlayLink] = useState("");
  const [buildVersion, setBuildVersion] = useState("");
  const [testingNotes, setTestingNotes] = useState("");
  const [tag, setTag] = useState("");
  const [projectId, setProjectId] = useState("");
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [s3, setS3] = useState("");

  // Profile
  const name = localStorage.getItem("tf_name");
  const role = localStorage.getItem("tf_role");
  const avatar = localStorage.getItem("tf_avatar");

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("tf_posts") || "[]");
    setPosts(savedPosts);

    const savedProjects = JSON.parse(localStorage.getItem("tf_projects") || "[]");
    setProjects(savedProjects);
  }, []);

  function savePosts(updated) {
    setPosts(updated);
    localStorage.setItem("tf_posts", JSON.stringify(updated));
  }

  function addPost() {
    if (!name || !role) {
      alert("Complete your profile before posting.");
      return;
    }
    if (!title.trim() || !googlePlayLink.trim()) return;

    const newPost = {
      id: Date.now(),
      title,
      body,
      googlePlayLink,
      buildVersion,
      testingNotes,
      tag,
      projectId: projectId || null,
      screenshots: [s1, s2, s3].filter(Boolean),
      upvotes: 0,
      comments: [],
      authorName: name,
      authorRole: role,
      authorAvatar: avatar,
      created: new Date().toISOString(),
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    setTitle("");
    setBody("");
    setGooglePlayLink("");
    setBuildVersion("");
    setTestingNotes("");
    setTag("");
    setProjectId("");
    setS1("");
    setS2("");
    setS3("");
  }

  function addComment(postId, text) {
    if (!name || !role) {
      alert("Complete your profile before commenting.");
      return;
    }
    if (!text.trim()) return;

    const updated = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              {
                id: Date.now(),
                text,
                authorName: name,
                authorRole: role,
                authorAvatar: avatar,
                created: new Date().toISOString(),
              },
            ],
          }
        : post
    );

    savePosts(updated);
  }

  function upvote(postId) {
    const updated = posts.map((post) =>
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    );
    savePosts(updated);
  }

  function sortedPosts() {
    if (sortMode === "top") {
      return [...posts].sort((a, b) => b.upvotes - a.upvotes);
    }
    if (sortMode === "comments") {
      return [...posts].sort((a, b) => b.comments.length - a.comments.length);
    }
    return [...posts].sort((a, b) => b.id - a.id);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ marginBottom: "1rem" }}>Community Feed</h1>

      {/* Sorting */}
      <select
        value={sortMode}
        onChange={(e) => setSortMode(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "1.5rem",
        }}
      >
        <option value="newest">Newest</option>
        <option value="top">Top (Upvotes)</option>
        <option value="comments">Most Commented</option>
      </select>

      {/* Create Post */}
      <div
        style={{
          padding: "1.5rem",
          background: "#f7f7fb",
          borderRadius: "12px",
          marginBottom: "2rem",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Share Your Google Play Build</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          style={inputStyle}
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Describe your app..."
          style={{ ...inputStyle, height: "120px" }}
        />

        <input
          value={googlePlayLink}
          onChange={(e) => setGooglePlayLink(e.target.value)}
          placeholder="Google Play link (required)"
          style={inputStyle}
        />

        <input
          value={buildVersion}
          onChange={(e) => setBuildVersion(e.target.value)}
          placeholder="Build version (e.g., 1.0.3)"
          style={inputStyle}
        />

        <textarea
          value={testingNotes}
          onChange={(e) => setTestingNotes(e.target.value)}
          placeholder="Testing instructions (optional)"
          style={{ ...inputStyle, height: "100px" }}
        />

        <select value={tag} onChange={(e) => setTag(e.target.value)} style={inputStyle}>
          <option value="">Select Tag</option>
          <option>Android Game</option>
          <option>Utility App</option>
          <option>Beta Testing</option>
          <option>Update</option>
        </select>

        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          style={inputStyle}
        >
          <option value="">Link to Project (optional)</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <h3>Screenshots (up to 3)</h3>
        <input value={s1} onChange={(e) => setS1(e.target.value)} placeholder="Screenshot 1 URL" style={inputStyle} />
        <input value={s2} onChange={(e) => setS2(e.target.value)} placeholder="Screenshot 2 URL" style={inputStyle} />
        <input value={s3} onChange={(e) => setS3(e.target.value)} placeholder="Screenshot 3 URL" style={inputStyle} />

        <button onClick={addPost} style={buttonPrimary}>
          Post
        </button>
      </div>

      {/* Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {sortedPosts().map((post) => (
          <PostCard key={post.id} post={post} upvote={upvote} addComment={addComment} />
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonPrimary = {
  padding: "0.75rem 1.5rem",
  borderRadius: "8px",
  border: "none",
  background: "#4a6cf7",
  color: "white",
  cursor: "pointer",
};

function PostCard({ post, upvote, addComment }) {
  const [commentText, setCommentText] = useState("");

  return (
    <div
      style={{
        padding: "1.5rem",
        background: "white",
        borderRadius: "12px",
        border: "1px solid #e0e0e0",
      }}
    >
      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        {post.authorAvatar && (
          <img
            src={post.authorAvatar}
            alt="avatar"
            style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "0.75rem" }}
          />
        )}
        <div>
          <strong>{post.authorName}</strong>
          <div style={{ opacity: 0.7, fontSize: "0.9rem" }}>{post.authorRole}</div>
        </div>
      </div>

      <h3>{post.title}</h3>

      {post.tag && (
        <span
          style={{
            display: "inline-block",
            padding: "0.25rem 0.75rem",
            background: "#eef1ff",
            borderRadius: "6px",
            fontSize: "0.85rem",
            marginBottom: "1rem",
          }}
        >
          {post.tag}
        </span>
      )}

      {post.buildVersion && (
        <div style={{ opacity: 0.7, marginBottom: "1rem" }}>Build: {post.buildVersion}</div>
      )}

      <p style={{ opacity: 0.8 }}>{post.body}</p>

      {/* Screenshots */}
      {post.screenshots.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          {/* Large portrait */}
          <img
            src={post.screenshots[0]}
            alt="screenshot"
            style={{
              width: "100%",
              borderRadius: "12px",
              marginBottom: "0.75rem",
              objectFit: "cover",
            }}
          />

          {/* Two smaller */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {post.screenshots[1] && (
              <img
                src={post.screenshots[1]}
                alt="screenshot"
                style={{
                  width: "50%",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
            )}
            {post.screenshots[2] && (
              <img
                src={post.screenshots[2]}
                alt="screenshot"
                style={{
                  width: "50%",
                  borderRadius: "12px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Google Play button */}
      <a
        href={post.googlePlayLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          background: "#4a6cf7",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          marginTop: "1rem",
        }}
      >
        Test App on Google Play
      </a>

      {/* Project link */}
      {post.projectId && (
        <p style={{ marginTop: "0.5rem" }}>
          Linked Project:{" "}
          <a href={`/projects/${post.projectId}`} style={{ color: "#4a6cf7" }}>
            View Project
          </a>
        </p>
      )}

      {/* Upvotes */}
      <button
        onClick={() => upvote(post.id)}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          background: "white",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        👍 {post.upvotes}
      </button>

      {/* Comments */}
      <div style={{ marginTop: "1.5rem" }}>
        <h4>Comments</h4>

        {post.comments.map((c) => (
          <div
            key={c.id}
            style={{
              padding: "0.75rem",
              background: "#f7f7fb",
              borderRadius: "8px",
              marginTop: "0.5rem",
            }}
          >
            <strong>{c.authorName}</strong> — <span>{c.authorRole}</span>
            <p style={{ margin: "0.5rem 0" }}>{c.text}</p>
            <p style={{ opacity: 0.5, fontSize: "0.8rem" }}>
              {new Date(c.created).toLocaleString()}
            </p>
          </div>
        ))}

        {/* Add comment */}
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          style={inputStyle}
        />
        <button
          onClick={() => {
            addComment(post.id, commentText);
            setCommentText("");
          }}
          style={buttonPrimary}
        >
          Comment
        </button>
      </div>
    </div>
  );
}