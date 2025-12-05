import "./newsModal.css";

const NewsModal = ({ show, article, onClose }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button">
          <i className="fa-solid fa-xmark" onClick={onClose}></i>
        </span>
        {article && (
          <>
            <img src={article?.image} alt={article?.title} />
            <h2 className="modal-title">{article?.title}</h2>
            <p className="modal-source">Source: {article?.source.name}</p>
            <p className="modal-date">
              {new Date(article?.publishedAt).toLocaleString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="modal-text">{article?.content}</p>

            <a
              href={article?.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more"
            >
              Read More
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default NewsModal;
