import { useEffect, useState } from "react";
import axios from "axios";
import "./news.css";
import Weather from "./weather";
import Calender from "./calander";
import NewsModal from "./newsModal";
import BookMark from "./bookMark";
import BlogsModal from "./blogsModal";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";

const News = ({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) => {
  const ApiKey = import.meta.env.VITE_GNEWS_API_KEY;
  const [newsData, setNewsData] = useState([]);
  const [headlineData, setHeadlineData] = useState(null);
  const [selectedCatagory, setSelectedCatagory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setsearchInput] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showBookMarkModal, setShowBookMarkModal] = useState(false);
  const [bookMarks, setBookMarks] = useState([]);
   const [selectedPost, setSelectedPost] = useState(null)
  const [showBlogModal, setShowBlogModal] = useState(false)

  const catagories = [
    "general",
    "world",
    "business",
    "technology",
    "entertainment",
    "sports",
    "science",
    "health",
    "nation",
  ];

  useEffect(() => {
    const fatchNews = async () => {
      
      let url = `/api/fetchNews?category=${selectedCatagory}`;
      if (searchQuery)
        url = `/api/fetchNews?type=search&q=${searchQuery}`;
      const response = await axios.get(url);
      const fatchedNews = response.data.articles;
      fatchedNews.forEach((article) => {
        if (!article.image) article.image = noImg;
      });
      setHeadlineData(fatchedNews[0]);
      setNewsData(fatchedNews.slice(1, 7));
      const storedBookMarks =
        JSON.parse(localStorage.getItem("bookMarks")) || [];
      setBookMarks(storedBookMarks);
    };
    fatchNews();
  }, [selectedCatagory, searchQuery]);

  const handleSelectedCatagory = (e, catagory) => {
    e.preventDefault();
    setSelectedCatagory(catagory);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setsearchInput("");
  };
  const handleArticle = (article) => {
    setShowArticleModal(true);
    setSelectedArticle(article);
  };
  const handleBookMark = () => {
    setShowBookMarkModal(true);
  };
  const handleBookMarksClick = (article) => {
    setBookMarks((prev) => {
      const updatedBookMarks = prev.find(
        (bookMark) => bookMark?.title === article.title
      )
        ? prev.filter((bookMark) => bookMark?.title !== article.title)
        : [...prev, article];
      localStorage.setItem("bookMarks", JSON.stringify(updatedBookMarks));
      return updatedBookMarks;
    });
  };

   const handleBlogClick = (blog) => {
    setSelectedPost(blog)
    setShowBlogModal(true)
  }

  const closeBlogModal = () => {
    setShowBlogModal(false)
    setSelectedPost(null)
  }

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News & Blogs</h1>
        <div className="search-bar">
          <form onSubmit={(e) => handleSearch(e)}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchInput}
              onChange={(e) => setsearchInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user" onClick={onShowBlogs}>
            <img src={userImg || noImg} alt="user Img" />
            <p>Mar's Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {catagories.map((catagory) => (
                <a
                  href="#"
                  key={catagory}
                  className="nav-link"
                  onClick={(e) => handleSelectedCatagory(e, catagory)}
                >
                  {catagory.toLocaleUpperCase()}
                </a>
              ))}

              <a href="#" className="nav-link" onClick={() => handleBookMark()}>
                Bookmarks <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          <div className="headline" onClick={() => handleArticle(headlineData)}>
            <img src={headlineData?.image || noImg} alt={headlineData?.title} />
            <h2 className="headline-title">
              {headlineData?.title}{" "}
              <i
                className={`${
                  bookMarks.some(
                    (bookMark) => bookMark?.title === headlineData?.title
                  )
                    ? "fa-solid"
                    : "fa-regular"
                } fa-bookmark bookmark`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookMarksClick(headlineData);
                }}
              ></i>
            </h2>
          </div>
          <div className="news-grid">
            {newsData.map((article, index) => (
              <div
                key={index}
                className="news-grid-item"
                onClick={() => handleArticle(article)}
              >
                <img src={article.image || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i
                    className={`${
                      bookMarks.some(
                        (bookMark) => bookMark?.title === article?.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark bookmark`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookMarksClick(article);
                    }}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <NewsModal
          show={showArticleModal}
          article={selectedArticle}
          onClose={() => setShowArticleModal(false)}
        />
        <BookMark
          show={showBookMarkModal}
          onClose={() => setShowBookMarkModal(false)}
          bookMarks={bookMarks}
          deleteBookMark={handleBookMarksClick}
        />

         {blogs.length !== 0 && <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
            {blogs.map((blog, index) => ( 
              <div key={index} className="blog-post" onClick={() => handleBlogClick(blog)}>
                <img src={blog.image || noImg} alt={blog.title} />
                <h3>{blog.title}</h3>
                <div className="post-buttons">
                  <button className="edit-post" onClick={() => onEditBlog(blog)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    className="delete-post"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteBlog(blog)
                    }}
                  >
                    <i className="fa-regular fa-circle-xmark"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
           {selectedPost && showBlogModal && (
            <BlogsModal show={showBlogModal} blog={selectedPost} onClose={closeBlogModal} />
          )}
          </div>   }

        <div className="weather-calendar">
          <Weather />
          <Calender />
        </div>
      </div>
      <footer className="news-footer">
        <p>
          <span>News & Blogs App</span>
        </p>
        <p>&copy; All Right Reserved. By Code and Create</p>
      </footer>
    </div>
  );
};

export default News;
