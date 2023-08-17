const postRewiew = require('./../controllers/crudReview/postReview')
const getByUsername = require('./../controllers/crudReview/getByUsername')
const getReviews = require('../controllers/crudReview/getReviews')
const deleteReview = require('../controllers/crudReview/deleteReview')

const handlerPostReview = async(req,res) => {
    const {puntuacion, comentario, userName} = req.body
    try {
        if(!puntuacion || !comentario || !userName ) {
            return res.status(404).send('Ingrese los datos necesarios para realizar una reseña')
        } 
        const userPostReview = await postRewiew(puntuacion, comentario, userName) 
        return userPostReview ? res.status(201).json(userPostReview) : res.status(400).send('Error, no ha iniciado sesión')
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}
    

const handlerGetReviews = async(req, res) => {
    const {userName} = req.query
    try {
        const allReviews = await getReviews();
        if(userName){
            const findReviewByUsername = await getByUsername(userName)
            return findReviewByUsername.length > 0 ? res.status(200).json(findReviewByUsername) : res.status(404).send('Usuario no encontrado')
        } else {
            return res.status(200).json({Reviews: allReviews})
        }
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const handlerDeleteReview = async(req,res) => {
    const id = req.params.id;
    try {
        const deleteReviewByid = await deleteReview(id)
        return res.status(200).json({deleteReviewByid, message: 'Borrado con exito'})
    } catch (error) {
        error.message = "Ha ocurrido un error al intentar borrar la reseña"
        return res.status(500).json({error: error.message})
    }
}

module.exports = {handlerPostReview, handlerGetReviews, handlerDeleteReview}