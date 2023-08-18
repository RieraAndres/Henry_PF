const { Review, User } = require('../../db');

const deleteReview = async (id) => {
    try {
        const deleteReviewByid = await Review.findByPk(id);
        if(!deleteReviewByid){
            throw new Error('No existe esa reseña, intente borrar otro');
        }
        const deleteReview = await deleteReviewByid.destroy()
        return deleteReview
    } catch (error) {
        throw error
    }
};

module.exports = deleteReview;