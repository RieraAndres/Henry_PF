const {Review, User} = require('./../../db')

const getReviews = async() => {
    try {
        const allReviews = await Review.findAll({
            include: {
                model: User,
                as: 'reviewer',
                attributes: ['userName'],
            }
        })
        return allReviews
    } catch (error) {
        error.message = ('Error al acceder a todas las reseñas')
    }
}

module.exports = getReviews