import { useEffect, useState } from "react";
import axios from "axios";
import "./news.css";
import Weather from "./weather";
import Calander from "./calander";
import NewsModal from "./newsModal";
import BookMark from "./bookMark";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";

const News = () => {
  const ApiKey = import.meta.env.VITE_GNEWS_API_KEY;
  const [newsData, setNewsData] = useState([]);
  const [headlineData, setHeadlineData] = useState(null);
  const [selectedCatagory, setSelectedCatagory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setsearchInput] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showBookMarkModal, setShowBookMarkModal] = useState(false);

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
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCatagory}&lang=en&apikey=${ApiKey}`;
      if (searchQuery)
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=${ApiKey}`;
      const response = await axios.get(url);
      const fatchedNews = response.data.articles;
      fatchedNews.forEach((article) => {
        if (!article.image) article.image = noImg;
      });
      setHeadlineData(fatchedNews[0]);
      setNewsData(fatchedNews.slice(1, 7));
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

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">News& Blogs</h1>
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
          <div className="user">
            <img src={userImg} alt="user Img" />
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
              <i className="fa-regular fa-bookmark bookmark"></i>
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
                  <i className="fa-regular fa-bookmark bookmark"></i>
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
        <div className="my-blogs">my blog</div>
        <BookMark
          show={showBookMarkModal}
          onClose={() => setShowBookMarkModal(false)}
        />

        <div className="weather-calander">
          <Weather />
          <Calander />
        </div>
      </div>
      <footer className="news-footer">footer</footer>
    </div>
  );
};

export default News;
