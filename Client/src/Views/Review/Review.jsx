import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getUserReviews, getAllReviews } from "../../Redux/Actions";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

import styles from "./Review.module.css"


function Reviews() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  const [UserReviewsLocal, setUserReviewsLocal] = useState([]);
  const allReviews = useSelector((state) => state.allReviews);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCreateReview = () => {
    if (!comment) {
      toast.error("Por favor, escribe un comentario antes de crear la reseña", {
        position: "top-center",
        autoClose: 2000, // Tiempo en milisegundos para cerrar automáticamente la notificación
      });
      return;
    }

    if (!rating) {
      toast.error("Por favor, selecciona una valoración antes de crear la reseña.", {
        position: "top-center",
        autoClose: 2000, // Tiempo en milisegundos para cerrar automáticamente la notificación
      });
      return;
    }

    const reviewData = {
      puntuacion: rating,
      comentario: comment,
      userName: user.userName,
    };
    
    dispatch(createReview(reviewData)).then(() => {
      UserReviewsLocal.push(reviewData);
      dispatch(getUserReviews(user.id));
      setComment("");
      toast.success("Reseña creada exitosamente", {
        position: "top-center",
        autoClose: 1000,
        onClose:()=>{
          window.location.reload();
        }
      });
      
    });
  };

  useEffect(() => {
    dispatch(getUserReviews(user.id)).then((data) => {
      if(data && data.payload) {
        setUserReviewsLocal(data.payload);
      } else {
        setUserReviewsLocal([])
      }
      });
  }, [dispatch, user.id]);

  useEffect(() => {
    dispatch(getAllReviews())
  }, [dispatch]);

      
  // Filtrar las reseñas del usuario actual en "Mis reseñas"
  const userReviews = allReviews.filter(
    (review) => review.reviewer.userName === user.userName
  );

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
            <div>
                <textarea className={styles.commentTextarea} value={comment} onChange={handleCommentChange}></textarea>
            </div>
            <button className={styles.createButton} onClick={handleCreateReview}>Crear reseña</button>
            </div>

          {/* Zona para ver mis reviews */}
          <div className={styles.myReviews}>
            <h2>Mis reseñas</h2>
            {userReviews.length > 0 ? (
              <div className={styles.reviewContainer}>
              {userReviews.map((review, index) => (
                <div className={styles.reviewCard} key={index}>
                  <div className={styles['star-rating']}>
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={index < review.puntuacion ? styles['star-filled'] : styles['star-empty']}
                      >
                        &#9733; {/* Unicode star character */}
                      </span>
                    ))}
                  </div>
                  <p>{review.comentario}</p>
                  <h3>{review.reviewer.userName}</h3>
                </div>
              ))}
            </div>
            ) : (
              <p>Aún no has dejado ninguna reseña.</p>
            )}
          </div>

          {/* Zona para ver todas las reviews */}
          <div className={styles.allReviews}>
            <h2>Todas las reseñas</h2>
            <div className={styles.reviewContainer}>
              {allReviews.map((review, index) => (
                <div className={styles.reviewCard} key={index}>
                  <div className={styles['star-rating']}>
                    {[...Array(5)].map((_, index) => (
                      <span
                        key={index}
                        className={index < review.puntuacion ? styles['star-filled'] : styles['star-empty']}
                      >
                        &#9733; {/* Unicode star character */}
                      </span>
                    ))}
                  </div>
                  <p>{review.comentario}</p>
                  <h3>{review.reviewer.userName}</h3>
                </div>
              ))}
            </div>
          </div>
          <Footer className={styles.Footer}/>
          <ToastContainer />
          </div>
        );
    }


  export default Reviews;