import { useState, useEffect } from "react";
import News from "./components/news";
import Blogs from "./components/blogs";

function App() {
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showNews, setShowNews] = useState(true);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(savedBlogs);
  }, []);

  const handleCreateBlog = (newBlog, isEdit) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEdit
        ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog))
        : [...prevBlogs, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleBackToNews = () => {
    setShowNews(true);
    setShowBlogs(false);
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleEditBlog = (blog) => {
    setSelectedPost(blog);
    setIsEditing(true);
    setShowNews(false);
    setShowBlogs(true);
  };

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog !== blogToDelete);
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
  };

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlogs(true);
  };

  return (
    <>
      <div className="container">
        <div className="news-blog-app">
          {showNews && (
            <News
              onShowBlogs={handleShowBlogs}
              blogs={blogs}
              onEditBlog={handleEditBlog}
              onDeleteBlog={handleDeleteBlog}
            />
          )}
          {showBlogs && (
            <Blogs
              onBack={handleBackToNews}
              onCreateBlog={handleCreateBlog}
              editPost={selectedPost}
              isEditing={isEditing}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
