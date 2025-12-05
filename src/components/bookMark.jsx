import "./bookMark.css";
import demoImg from "../assets/images/demo.jpg";

const BookMark = ({ show, onClose }) => {
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
            <div className="bookMark-item">
              <img src={demoImg} alt="" />
              <h3>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur, soluta!
              </h3>
              <span className="delete-button">
                <i className="fa-regular fa-circle-xmark"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookMark;
