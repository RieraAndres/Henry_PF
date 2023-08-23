import { useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

import styles from "./Review.module.css"


function Reviews() {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState([]);
    const [filter, setFilter] = useState("all"); // Puede ser 'all' o un valor numérico
  
    const handleRatingChange = (value) => {
      setRating(value);
    };
  
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    const handleCreateReview = () => {
      const newReview = {
        rating: rating,
        comment: comment,
      };
  
      setReviews([...reviews, newReview]);
      setRating(1);
      setComment("");
    };
  
    const filteredReviews = filter === "all" ? reviews : reviews.filter(review => review.rating === parseInt(filter));
  
    return (
        <div className={styles.reviewsContainer}>
            <NavBar />
            
            {/* Zona para crear una review */}
            <div className={styles.createReview}>
            <h2>Crear una reseña</h2>
            <div className={styles.estrella} value={rating} onChange={(e) => handleRatingChange(e.target.value)}>
                <input value={5} name="rating" id="star5" type="radio" />
                <label htmlFor="star5"></label>
                <input value={4} name="rating" id="star4" type="radio" />
                <label htmlFor="star4"></label>
                <input value={3} name="rating" id="star3" type="radio" />
                <label htmlFor="star3"></label>
                <input value={2} name="rating" id="star2" type="radio" />
                <label htmlFor="star2"></label>
                <input value={1} name="rating" id="star1" type="radio" />
                <label htmlFor="star1"></label>
            </div>
            <h4>Comentario: </h4>
            <div>
                <textarea className={styles.commentTextarea} value={comment} onChange={handleCommentChange}></textarea>
            </div>
            <button className={styles.createButton} onClick={handleCreateReview}>Crear reseña</button>
            </div>
    
            {/* Zona para ver todas las reviews */}
            <div className={styles.allReviews}>
            <h2>Todas las reseñas</h2>
            <div>
                <label>Filtrar por: </label>
                <select className={styles.filterSelect} value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Valoración</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                </select>
            </div>
            <ul className={styles.reviewList}>
                {filteredReviews.map((review, index) => (
                <li key={index} className={styles.reviewItem}>
                    <p>Valoración: {review.rating}</p>
                    <p>Comentario: {review.comment}</p>
                </li>
                ))}
            </ul>
            </div>
            <Footer className={styles.Footer}/>
        </div>
        );
    }
  
  export default Reviews;