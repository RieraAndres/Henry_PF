const {Review, User} = require('../../db')

const postRewiew = async(puntuacion, comentario, userName) => {
    try {
        
        const userReview = await User.findOne({
            where:{ userName}
        })

        if(userReview){
            const createReview = await Review.create({
                puntuacion, 
                comentario,
                user_id: userReview.id
            })
            return createReview;
        } else {
            throw new Error('Inicie sesión para realizar una reseña')
        }
    } catch (error) {
        throw error
    }
}

module.exports = postRewiew;