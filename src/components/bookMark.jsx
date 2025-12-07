import "./bookMark.css";
import noImg from "../assets/images/no-img.png";


const BookMark = ({ show, onClose, bookMarks, deleteBookMark }) => {
  if (!show) return null;
  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close-button">
            <i className="fa-solid fa-xmark" onClick={onClose}></i>
          </span>
          <h2 className="bookMark-head">Bookmarked News</h2>
          <div className="bookMark-list">
            {bookMarks && bookMarks.map((bookMarkItem)=>(
              <div className="bookMark-item">
              <img src={bookMarkItem?.image || noImg} alt={bookMarkItem?.title} />
              <h3>
                {bookMarkItem?.title}
              </h3>
              <span className="delete-button" onClick={(e)=>{
                e.stopPropagation();
                deleteBookMark(bookMarkItem)}}>
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMark;
