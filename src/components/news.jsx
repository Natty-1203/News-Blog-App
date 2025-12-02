import React from 'react'
import "./news.css"
import Weather from './weather'
import Calander from './calander'
import userImg from '../assets/images/user.jpg'

const News = () => {
  return (
    <div className='news'>
        <header className='news-header'>
            <h1 className="logo">News& Blogs</h1>
            <div className="search-bar">
                <form>
                    <input type="text" placeholder='Search News...'/>
                    <button type='submit'>
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
                <nav className='categories'>
                    <h1 className='nav-heading'>Categories</h1>
                    <div className="nav-links">
                        <a href="#" className='nav-link'>General</a>
                        <a href="#" className='nav-link'>World</a>
                        <a href="#" className='nav-link'>Business</a>
                        <a href="#" className='nav-link'>Technology</a>
                        <a href="#" className='nav-link'>Entertainment</a>
                        <a href="#" className='nav-link'>Sport</a>
                        <a href="#" className='nav-link'>Science</a>
                        <a href="#" className='nav-link'>Health</a>
                        <a href="#" className='nav-link'>Nation</a>
                        <a href="#" className='nav-link'>Bookmarks <i className="fa-regular fa-bookmark"></i></a>
                    </div>
                </nav>
            </div>
            <div className="news-section">
                <div className="headline">headline</div>
                <div className="news-grid">news grid</div>
            </div>
            <div className="my-blogs">my blog</div>
            <div className="weather-calander">
                <Weather />
                <Calander />
            </div>
            
        </div>
        <footer className="news-footer">footer</footer>
      
    </div>
  )
}

export default News
